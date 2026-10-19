#!/usr/bin/env node
/**
 * Re-encode every JPEG/PNG in public/orla-product-images to WebP, in place.
 *
 *     pnpm images            # convert, then delete each original
 *     pnpm images --keep     # convert, keep the originals
 *
 * That folder is the only copy of the site's artwork, so this never resizes or
 * crops: every slot renders through `object-cover` at a centred position, and
 * the browser makes the same crop a pre-cropped file would bake in. The sources
 * are all at or under their slot size already (~1200-1400px long edge), so a
 * resize could only take detail away.
 *
 * An original is deleted only after its WebP has been written, decoded back and
 * scored against it. A file scoring under MIN_PSNR is kept and reported rather
 * than silently swapped for a visibly worse one.
 */

import { readdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIR = path.join(ROOT, "public", "orla-product-images");
const SOURCE = /\.(jpe?g|png)$/i;

// smartSubsample keeps the warm edges (lamp glow on oak) from bleeding, which
// plain 4:2:0 chroma does.
const WEBP = { effort: 6, smartSubsample: true };

// Measured against the decoded source. 40dB is past the point where a
// difference is visible at 1x. q88 clears it on every photograph here; the felt
// swatches are near-noise texture and land at ~39dB, so a file steps up the
// ladder until it passes instead of the whole set paying for the worst case.
const MIN_PSNR = 40;
const QUALITY_LADDER = [88, 92, 95];

async function psnr(a, b) {
  const [x, y] = await Promise.all(
    [a, b].map((input) => sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true })),
  );
  if (x.info.width !== y.info.width || x.info.height !== y.info.height) {
    throw new Error(`size changed: ${x.info.width}x${x.info.height} -> ${y.info.width}x${y.info.height}`);
  }
  let sum = 0;
  for (let i = 0; i < x.data.length; i++) {
    const d = x.data[i] - y.data[i];
    sum += d * d;
  }
  const mse = sum / x.data.length;
  return mse === 0 ? Infinity : 10 * Math.log10((255 * 255) / mse);
}

async function main() {
  const keep = process.argv.includes("--keep");
  const files = (await readdir(DIR)).filter((f) => SOURCE.test(f)).sort();
  if (files.length === 0) {
    console.log("nothing to convert — every image is already WebP");
    return;
  }

  let before = 0;
  let after = 0;
  const held = [];

  for (const file of files) {
    const src = path.join(DIR, file);
    const out = path.join(DIR, file.replace(SOURCE, ".webp"));

    // Encode and score in memory, write once: on Windows libvips keeps a
    // handle on a file it has just read, so rewriting `out` on the next rung
    // of the ladder fails with "unable to open for write".
    let quality;
    let encoded;
    let score = -Infinity;
    for (quality of QUALITY_LADDER) {
      // rotate() applies any EXIF orientation before the metadata is dropped,
      // so a phone photo cannot come out sideways.
      encoded = await sharp(src).rotate().webp({ ...WEBP, quality }).toBuffer();
      score = await psnr(src, encoded);
      if (score >= MIN_PSNR) break;
    }
    await writeFile(out, encoded);

    const s = await stat(src);
    before += s.size;
    after += encoded.length;

    const flag = score < MIN_PSNR ? "  ! under threshold — original kept" : "";
    console.log(
      `${file.padEnd(28)} ${(s.size / 1024).toFixed(0).padStart(5)} KB -> ` +
        `${(encoded.length / 1024).toFixed(0).padStart(4)} KB  q${quality}  ${score.toFixed(1)} dB${flag}`,
    );

    if (score < MIN_PSNR) held.push(file);
    else if (!keep) await unlink(src);
  }

  const mb = (n) => (n / 1024 / 1024).toFixed(1);
  console.log(`\n${files.length} files  ${mb(before)} MB -> ${mb(after)} MB`);
  if (held.length) {
    console.log(`${held.length} kept for review: ${held.join(", ")}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
