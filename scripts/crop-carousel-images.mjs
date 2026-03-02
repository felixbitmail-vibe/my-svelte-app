/**
 * Beskærer karuselbilleder så det centrerede 4:3-udsnit beholdes
 * (giver ofte både ansigt og hund med i billedet).
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
  'dog-dachshund.png',
  'dog-portrait.png',
  'gallery-1.png',
  'gallery-2.png',
  'gallery-3.png',
  'gallery-5.png',
  'gallery-6.png'
];

const TARGET_ASPECT = 4 / 3; // 4:3 landscape

async function centerCropTo43(inputPath, outputPath) {
  const meta = await sharp(inputPath).metadata();
  const { width: w, height: h } = meta;
  let cropWidth, cropHeight, left, top;

  if (w / h > TARGET_ASPECT) {
    cropHeight = h;
    cropWidth = Math.round(h * TARGET_ASPECT);
    left = Math.round((w - cropWidth) / 2);
    top = 0;
  } else {
    cropWidth = w;
    cropHeight = Math.round(w / TARGET_ASPECT);
    left = 0;
    top = Math.round((h - cropHeight) / 2);
  }

  await sharp(inputPath)
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .toFile(outputPath);
  console.log(`Cropped: ${basename(inputPath)}`);
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
    await centerCropTo43(inputPath, tempPath);
    await rename(tempPath, inputPath);
  }
  console.log('Done. Carousel images updated with center 4:3 crop.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
