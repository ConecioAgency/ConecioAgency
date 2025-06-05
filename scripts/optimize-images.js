const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const QUALITY = 80;
const SIZES = [640, 750, 828, 1080, 1200, 1920];

async function optimizeImage(inputPath, outputPath, size) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Calculer les nouvelles dimensions en conservant le ratio
    const ratio = metadata.width / metadata.height;
    const newWidth = size;
    const newHeight = Math.round(size / ratio);

    await image
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    console.log(`✓ Optimized: ${path.basename(inputPath)} -> ${size}px`);
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error);
  }
}

async function processImages() {
  const inputDir = path.join(process.cwd(), 'public/images');
  const outputDir = path.join(process.cwd(), 'public/images/optimized');

  // Créer le dossier de sortie s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Trouver toutes les images
  const images = glob.sync('**/*.{jpg,jpeg,png}', { cwd: inputDir });

  for (const image of images) {
    const inputPath = path.join(inputDir, image);
    const imageName = path.parse(image).name;

    // Créer les versions optimisées pour chaque taille
    for (const size of SIZES) {
      const outputPath = path.join(
        outputDir,
        `${imageName}-${size}.webp`
      );
      await optimizeImage(inputPath, outputPath, size);
    }
  }
}

processImages().catch(console.error); 