import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function webpHasAlpha(path: string) {
  const buffer = readFileSync(path);
  const riff = buffer.subarray(0, 4).toString("ascii");
  const webp = buffer.subarray(8, 12).toString("ascii");

  if (riff !== "RIFF" || webp !== "WEBP") {
    return false;
  }

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunk = buffer.subarray(offset, offset + 4).toString("ascii");
    const size = buffer.readUInt32LE(offset + 4);
    const dataStart = offset + 8;

    if (chunk === "ALPH") {
      return true;
    }

    if (chunk === "VP8X" && size > 0) {
      const flags = buffer[dataStart];
      return (flags & 0b0001_0000) !== 0;
    }

    offset = dataStart + size + (size % 2);
  }

  return false;
}

describe("visual assets", () => {
  it("uses transparent hero cutout assets so the first viewport blends into the white page", () => {
    const heroAssets = ["hero-desktop-cutout.webp", "hero-mobile-cutout.webp"];

    for (const asset of heroAssets) {
      const path = join(process.cwd(), "src/assets/apple", asset);

      expect(existsSync(path), `${asset} should exist`).toBe(true);
      expect(webpHasAlpha(path), `${asset} should carry alpha transparency`).toBe(true);
    }
  });
});
