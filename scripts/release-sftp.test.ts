import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const scriptPath = join(process.cwd(), "scripts/release-sftp.sh");
const tempRoots: string[] = [];

afterEach(() => {
  for (const tempRoot of tempRoots.splice(0)) {
    rmSync(tempRoot, { recursive: true, force: true });
  }
});

describe("release-sftp.sh", () => {
  it("uses ubuntu as the default SFTP user", () => {
    const fixture = createReleaseFixture({ installBuildDependencies: true });

    const result = runReleaseScript(fixture);

    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(result.stdout).toContain("Uploading dist/ to ubuntu@161.189.5.168:/usr/share/www");
    expect(readFileSync(fixture.sftpCaptureFile, "utf8")).toContain("TARGET=ubuntu@161.189.5.168");
    expect(readFileSync(fixture.sftpCaptureFile, "utf8")).toContain("cd /usr/share/www");
  });

  it("installs missing build dependencies, builds, then uploads", () => {
    const fixture = createReleaseFixture({ installBuildDependencies: false });

    const result = runReleaseScript(fixture);

    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(readFileSync(fixture.npmCaptureFile, "utf8").trim().split("\n")).toEqual([
      "ci",
      "run build"
    ]);
    expect(readFileSync(fixture.sftpCaptureFile, "utf8")).toContain("lcd dist");
  });
});

function createTempRoot() {
  const tempRoot = join(tmpdir(), `lefin-release-${process.pid}-${tempRoots.length}`);
  rmSync(tempRoot, { recursive: true, force: true });
  mkdirSync(tempRoot, { recursive: true });
  tempRoots.push(tempRoot);
  return tempRoot;
}

function createReleaseFixture({ installBuildDependencies }: { installBuildDependencies: boolean }) {
  const tempRoot = createTempRoot();
  const projectDir = join(tempRoot, "project");
  const fakeBinDir = join(tempRoot, "bin");
  const npmCaptureFile = join(tempRoot, "npm-call.txt");
  const sftpCaptureFile = join(tempRoot, "sftp-call.txt");
  const localDir = join(projectDir, "dist");

  mkdirSync(projectDir);
  mkdirSync(fakeBinDir);
  writeFileSync(join(projectDir, "package.json"), '{"scripts":{"build":"vite build"}}');
  writeFileSync(join(projectDir, "package-lock.json"), '{"lockfileVersion":3}');

  if (installBuildDependencies) {
    writeBuildDependencyMarkers(projectDir);
  }

  writeFakeNpm(join(fakeBinDir, "npm"));
  writeFakeSftp(join(fakeBinDir, "sftp"));

  return {
    fakeBinDir,
    localDir,
    npmCaptureFile,
    projectDir,
    sftpCaptureFile,
    tempRoot
  };
}

function runReleaseScript(fixture: ReturnType<typeof createReleaseFixture>) {
  return spawnSync("bash", [scriptPath], {
    cwd: fixture.projectDir,
    encoding: "utf8",
    env: {
      PATH: `${fixture.fakeBinDir}:${process.env.PATH ?? ""}`,
      NPM_CAPTURE_FILE: fixture.npmCaptureFile,
      SFTP_CAPTURE_FILE: fixture.sftpCaptureFile,
      TMPDIR: fixture.tempRoot
    }
  });
}

function writeBuildDependencyMarkers(projectDir: string) {
  const binDir = join(projectDir, "node_modules", ".bin");
  mkdirSync(binDir, { recursive: true });
  writeFileSync(join(binDir, "tsc"), "#!/usr/bin/env bash\n", { mode: 0o755 });
  writeFileSync(join(binDir, "vite"), "#!/usr/bin/env bash\n", { mode: 0o755 });
}

function writeFakeNpm(path: string) {
  writeFileSync(
    path,
    `#!/usr/bin/env bash
set -euo pipefail

printf '%s\\n' "$*" >> "\${NPM_CAPTURE_FILE}"

if [[ "$*" == "ci" || "$*" == "install" ]]; then
  mkdir -p node_modules/.bin
  printf '#!/usr/bin/env bash\\n' > node_modules/.bin/tsc
  printf '#!/usr/bin/env bash\\n' > node_modules/.bin/vite
  chmod +x node_modules/.bin/tsc node_modules/.bin/vite
  exit 0
fi

if [[ "$*" == "run build" ]]; then
  test -x node_modules/.bin/tsc
  test -x node_modules/.bin/vite
  mkdir -p dist
  printf '<!doctype html>' > dist/index.html
  exit 0
fi

echo "Unexpected npm command: $*" >&2
exit 1
`,
    { mode: 0o755 }
  );
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
