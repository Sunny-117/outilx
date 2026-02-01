import axios from "axios";
import fs, { writeFileSync } from "fs";
import path from "path";
import { spawn } from "child_process";
import dotenv from "dotenv";

// 加载.env文件
dotenv.config();

// 如果要支持并发（例如 N 个同时执行）
// 1. 用 execSync 会阻塞，换成异步的 exec（child_process 的 Promise 版本）。
// 2. 使用一个「并发控制器」限制最多 N 个任务同时进行（常见实现：队列、p-limit、手写 promise pool）。
// 3. 每个仓库的 pull/clone 操作作为一个 Promise，交给并发池调度。
// 4. 使用 spawn 来流式输出子进程日志并支持超时

// 使用 spawn 来流式输出子进程日志并支持超时
function runCommandStreaming(
  command: string,
  args: string[],
  cwd: string,
  timeoutMs: number,
  prefix: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd });

    let lastOutput = Date.now();
    const startTime = Date.now();
    const onData = (data: Buffer, streamName: string) => {
      lastOutput = Date.now();
      const text = data.toString();
      // 每行都加前缀，避免大块输出难以区分
      text.split(/\r?\n/).forEach((line) => {
        if (line.trim().length > 0) {
          console.log(`${prefix} ${streamName}: ${line}`);
        }
      });
    };

    // 心跳：如果较长时间没有任何输出，则每隔 heartbeatInterval 打印一次提示
    const heartbeatInterval = 10000; // 10s
    const heartbeatTimer = setInterval(() => {
      // 如果子进程已经结束，lastOutput 会在 close/error 中清除 timer
      const since = Date.now() - lastOutput;
      if (since >= heartbeatInterval) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        console.log(`${prefix} ...still running, no output for ${Math.floor(since / 1000)}s (elapsed ${elapsed}s)`);
      }
    }, heartbeatInterval);

    child.stdout.on("data", (d) => onData(d, "stdout"));
    child.stderr.on("data", (d) => onData(d, "stderr"));

    let killedByTimeout = false;
    const timer = setTimeout(() => {
      killedByTimeout = true;
      // 先尝试正常终止
      try {
        child.kill();
      } catch (e) {
        // ignore
      }
    }, timeoutMs);

    child.on("error", (err) => {
      clearTimeout(timer);
      clearInterval(heartbeatTimer);
      reject(err);
    });

    child.on("close", (code, signal) => {
      clearTimeout(timer);
      clearInterval(heartbeatTimer);
      if (killedByTimeout) {
        const err: any = new Error(`timed out after ${timeoutMs}ms`);
        err.timedOut = true;
        return reject(err);
      }
      if (code === 0) {
        resolve();
      } else {
        const err: any = new Error(`process exited with code ${code}${signal ? `, signal ${signal}` : ''}`);
        reject(err);
      }
    });
  });
}

interface RepoConfig {
  username: string;
  token?: string; // 改为可选
  platform: "github" | "gitee";
  cloneDir?: string;
  concurrency?: number; // 新增：并发数，默认 5
  timeoutMs?: number; // 新增：每个 clone/pull 的超时时间（毫秒）
}

// 简单的并发池
async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number
): Promise<T[]> {
  const results: T[] = [];
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const currentIndex = index++;
      try {
        results[currentIndex] = await tasks[currentIndex]();
      } catch (err: any) {
        console.error(`Task ${currentIndex} failed: ${err.message}`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  return results;
}

async function fetchAllRepos(apiUrl: string, headers: any): Promise<any[]> {
  let page = 1;
  const perPage = 100;
  let allRepos: any[] = [];

  while (true) {
    const url = `${apiUrl}?per_page=${perPage}&page=${page}`;
    const resp = await axios.get(url, { headers });
    const repos = resp.data;

    if (!repos || repos.length === 0) {
      break;
    }

    allRepos = allRepos.concat(repos);

    if (repos.length < perPage) {
      break; // 最后一页
    }
    page++;
  }

  return allRepos;
}


export async function autoPullRepository(config: RepoConfig): Promise<void> {
  const { username, token: tokenFromConfig, platform, cloneDir, concurrency = 5 } = config;
  const timeoutMs = config.timeoutMs || Number(process.env.GIT_TIMEOUT_MS) || 120000; // 默认 2 分钟

  // 优先使用配置中的token，如果没有则从.env文件读取
  const token = tokenFromConfig || process.env.GIT_TOKEN;
  if (!token) {
    throw new Error('Git token is required. Please provide it in config or set GIT_TOKEN in .env file');
  }

  const BASE_DIR = path.join(cloneDir || "cloned_repos", username);

  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true });
  }

  const PLATFORM_CONFIG = {
    github: {
      apiUrl: `https://api.github.com/users/${username}/repos`,
      authHeader: `token ${token}`,
      cloneUrl: (repo: string) =>
        `https://${username}:${token}@github.com/${username}/${repo}.git`,
    },
    gitee: {
      apiUrl: `https://gitee.com/api/v5/users/${username}/repos?access_token=${token}`,
      authHeader: "",
      cloneUrl: (repo: string) =>
        `https://${username}:${token}@gitee.com/${username}/${repo}.git`,
    },
  };

  const { apiUrl, authHeader, cloneUrl } = PLATFORM_CONFIG[platform];

  try {
    const repos = await fetchAllRepos(apiUrl, {
      "User-Agent": "Node.js",
      Accept: "application/vnd.github.v3+json",
      Authorization: authHeader,
    });

    writeFileSync('./repos.json', JSON.stringify(repos, null, 2))
    console.log(`\nFound ${repos.length} repositories on ${platform}`);
    console.log(`Cloning to: ${BASE_DIR}\n`);

    const tasks = repos.map((repo: any, index: number) => {
      const repoName = repo.name || repo.full_name.split("/")[1];
      const repoPath = path.join(BASE_DIR, repoName);
      const progress = `[${index + 1}/${repos.length}]`;

      return async () => {
        console.log(`${progress} Processing ${repoName}`);
        try {
          if (fs.existsSync(repoPath)) {
            console.log(`  ↳ Updating repository...`);
            await runCommandStreaming('git', ['pull'], repoPath, timeoutMs, `(${repoName})`);
            console.log(`  ✓ Updated successfully\n`);
          } else {
            console.log(`  ↳ Cloning repository...`);
            // git clone --progress <url> <path> (加 --progress 强制输出进度，即使非交互式)
            await runCommandStreaming('git', ['clone', '--progress', cloneUrl(repoName), repoPath], BASE_DIR, timeoutMs, `(${repoName})`);
            console.log(`  ✓ Cloned successfully\n`);
          }
        } catch (error: any) {
          // 判断是否为超时
          const isTimeout = error && (error.killed || error.signal === 'SIGTERM' || /timed out/i.test(error.message) || /ETIMEDOUT/i.test(error.message));
          const reason = isTimeout ? `timeout after ${timeoutMs}ms` : (error && error.message ? error.message : String(error));
          console.error(`  ✗ Error: ${reason}\n`);
          // 记录失败仓库（推迟在外层打印汇总）
          failedRepos.push({ name: repoName, reason });
        }
      };
    });

    // 并发执行所有任务
    await runWithConcurrency(tasks, concurrency);

    console.log("All repositories processed!\n");

    // 打印失败汇总
    if (failedRepos.length > 0) {
      console.log(`Summary: ${failedRepos.length} repositories failed:`);
      failedRepos.forEach((f) => {
        console.log(`  - ${f.name}: ${f.reason}`);
      });
      try {
        writeFileSync(path.join(BASE_DIR, 'failed_repos.json'), JSON.stringify(failedRepos, null, 2));
      } catch (e) {
        console.error('Failed to write failed_repos.json:', (e as any).message);
      }
    } else {
      console.log('All repositories cloned/updated successfully!');
    }
  } catch (error: any) {
    console.error(`Failed to fetch repositories: ${error.message}`);
  }
}

// 记录失败仓库的数组（在模块作用域内定义以便任务闭包访问）
const failedRepos: { name: string; reason: string }[] = [];
