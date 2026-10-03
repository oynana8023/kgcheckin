import { execFileSync } from "child_process";

const TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxx"; // ← 你的 token

function hasSecretWriteToken() {
  return Boolean(TOKEN);
}

function setRepoSecret(name, value) {
  const repository = process.env.GITHUB_REPOSITORY; // 这个也得有值

  if (!repository) {
    throw new Error("GITHUB_REPOSITORY 未配置");
  }

  execFileSync("gh", ["secret", "set", name, "--repo", repository], {
    input: value,
    encoding: "utf8",
    env: {
      ...process.env,
      GH_TOKEN: TOKEN,
    },
    stdio: ["pipe", "pipe", "pipe"],
  });
}

export { hasSecretWriteToken, setRepoSecret };