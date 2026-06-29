import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const tempRoots: string[] = [];

afterEach(() => {
  for (const tempRoot of tempRoots.splice(0)) {
    rmSync(tempRoot, { recursive: true, force: true });
  }
});

describe("release-sftp.sh", () => {
  it("uses ubuntu as the default SFTP user", () => {
    const tempRoot = createTempRoot();
    const localDir = join(tempRoot, "dist");
    const fakeBinDir = join(tempRoot, "bin");
    const captureFile = join(tempRoot, "sftp-call.txt");

    mkdirSync(localDir);
    mkdirSync(fakeBinDir);
    writeFileSync(join(localDir, "index.html"), "<!doctype html>");
    writeFakeSftp(join(fakeBinDir, "sftp"));

    const result = spawnSync("bash", ["scripts/release-sftp.sh"], {
      cwd: process.cwd(),
      encoding: "utf8",
      env: {
        PATH: `${fakeBinDir}:${process.env.PATH ?? ""}`,
        LEFIN_RELEASE_DIR: localDir,
        SFTP_CAPTURE_FILE: captureFile,
        TMPDIR: tempRoot
      }
    });

    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(result.stdout).toContain(`Uploading ${localDir}/ to ubuntu@161.189.5.168:/var/local/www`);
    expect(readFileSync(captureFile, "utf8")).toContain("TARGET=ubuntu@161.189.5.168");
  });
});

function createTempRoot() {
  const tempRoot = join(tmpdir(), `lefin-release-${process.pid}-${tempRoots.length}`);
  rmSync(tempRoot, { recursive: true, force: true });
  mkdirSync(tempRoot, { recursive: true });
  tempRoots.push(tempRoot);
  return tempRoot;
}

function writeFakeSftp(path: string) {
  writeFileSync(
    path,
    `#!/usr/bin/env bash
set -euo pipefail

batch_file=""
previous_arg=""
target=""
for arg in "$@"; do
  if [[ "\${previous_arg}" == "-b" ]]; then
    batch_file="\${arg}"
  fi
  previous_arg="\${arg}"
  target="\${arg}"
done

{
  printf 'TARGET=%s\\n' "\${target}"
  printf 'ARGS=%s\\n' "$*"
  if [[ -n "\${batch_file}" ]]; then
    printf 'BATCH_START\\n'
    cat "\${batch_file}"
    printf 'BATCH_END\\n'
  fi
} > "\${SFTP_CAPTURE_FILE}"
`,
    { mode: 0o755 }
  );
}
