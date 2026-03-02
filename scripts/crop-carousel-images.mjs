/**
 * Let kanttrim af karuselbilleder så hele mennesket og hele hunden
 * forbliver synlige (centreret 95 % af bredde og højde).
 * Kør: node scripts/crop-carousel-images.mjs
 */
import sharp from 'sharp';
import { readdir, rename } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, '..', 'static', 'images');

const CAROUSEL_FILES = [
  'dog-walk-nature.png',
  'winter-dog-walk.png',
  'gallery-1.png',
  'gallery-2.png',
  'gallery-3.png',
  'gallery-5.png',
  'gallery-6.png'
];

/** Bevar 95 % af billedet fra centrum så hele person + hund ses. */
const KEEP_RATIO = 0.95;

async function centerTrim(inputPath, outputPath) {
  const meta = await sharp(inputPath).metadata();
  const { width: w, height: h } = meta;
  const cropWidth = Math.round(w * KEEP_RATIO);
  const cropHeight = Math.round(h * KEEP_RATIO);
  const left = Math.round((w - cropWidth) / 2);
  const top = Math.round((h - cropHeight) / 2);

  await sharp(inputPath)
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .toFile(outputPath);
  console.log(`Trimmed: ${basename(inputPath)}`);
}

async function main() {
  const existing = await readdir(IMAGES_DIR).catch(() => []);
  for (const file of CAROUSEL_FILES) {
    const inputPath = join(IMAGES_DIR, file);
    if (!existing.includes(file)) {
      console.warn(`Skip (not found): ${file}`);
      continue;
    }
    const tempPath = join(IMAGES_DIR, file.replace(/(\.[^.]+)$/, '.tmp$1'));
    await centerTrim(inputPath, tempPath);
    await rename(tempPath, inputPath);
  }
  console.log('Done. Carousel images trimmed (whole person + dog preserved).');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
