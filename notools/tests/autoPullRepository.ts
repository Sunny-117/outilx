import { autoPullRepository } from "../src";

autoPullRepository({
  username: "bjmashibing",
  platform: 'github',
  cloneDir: '/Users/olive/Desktop/code/msb/cc',
  concurrency: 30
});
