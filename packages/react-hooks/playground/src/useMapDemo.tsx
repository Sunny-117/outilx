import React from "react";
import { useMap } from "@outilx/react-hooks";

export default function UseMapDemo() {
  const [map, { set, setAll, remove, reset, get }] = useMap([
    ["msg", "hello world"],
    [123, "number type"],
  ]);

  return (
    <div>
      <h2>useMap Demo</h2>
      <p>演示 Map 数据结构的状态管理</p>

      <div>
        <button onClick={() => set(String(Date.now()), new Date().toJSON())}>
          添加时间戳
        </button>
        <button onClick={() => setAll([["text", "this is a new Map"]])}>
          设置新 Map
        </button>
        <button onClick={() => remove("msg")} disabled={!get("msg")}>
          删除 'msg'
        </button>
        <button onClick={() => reset()}>重置</button>
      </div>

      <div>
        <p>Map 内容 (共 {map.size} 项):</p>
        <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
      </div>

      <hr />

      <div>
        <h4>功能说明：</h4>
        <ul>
          <li>支持任意类型的 key (字符串、数字等)</li>
          <li>提供 set、setAll、remove、reset、get 等便捷方法</li>
          <li>适合管理键值对数据结构</li>
        </ul>
      </div>
    </div>
  );
}
