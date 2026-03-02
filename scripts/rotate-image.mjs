/**
 * Roter ét billede -90 grader (mod uret) og overskriv filen.
 * Brug hvis et karuselbillede ved uheld er roteret 90 grader.
 * Kør: node scripts/rotate-image.mjs static/images/gallery-3.png
 */
import sharp from 'sharp';
import { join } from 'path';

import { rename } from 'fs/promises';
const path = process.argv[2];
if (!path) {
  console.error('Brug: node scripts/rotate-image.mjs static/images/FILNAVN.png');
  process.exit(1);
}
const fullPath = join(process.cwd(), path);
const angle = -90; // mod uret

async function main() {
  const tempPath = fullPath.replace(/(\.[^.]+)$/, '.tmp$1');
  await sharp(fullPath).rotate(angle).toFile(tempPath);
  await rename(tempPath, fullPath);
  console.log(`Roteret ${angle}°: ${path}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
