import { createBuildConfig } from "../../scripts/tsdown.config.base";

export default createBuildConfig({
  entry: ["src/index.ts"],
  platform: "browser",
  formats: ["esm", "cjs"],
});
