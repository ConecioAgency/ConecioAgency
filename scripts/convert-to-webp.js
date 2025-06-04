const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToConvert = [
  'Ai_Maketing_reseaux_sociaux',
  'content-marketing',
  'data_marketing',
  'digital_trend',
  'email_Marketing',
  'Futur_du_Marketing',
  'IA_marketing',
  'Influenceurs-2025'
];

const blogImagesPath = path.join(process.cwd(), 'public', 'images', 'blog');

async function convertToWebP() {
  for (const imageName of imagesToConvert) {
    const inputPath = path.join(blogImagesPath, `${imageName}.png`);
    const outputPath = path.join(blogImagesPath, `${imageName}.webp`);

    try {
      // Vérifier si l'image source existe
      if (!fs.existsSync(inputPath)) {
        console.log(`Image source non trouvée: ${inputPath}`);
        continue;
      }

      // Convertir l'image en WebP avec des paramètres optimisés
      await sharp(inputPath)
        .webp({
          quality: 80, // Qualité optimale pour WebP
          effort: 6, // Niveau d'effort de compression (0-6)
          lossless: false, // Compression avec perte pour une meilleure réduction de taille
          nearLossless: true, // Compression presque sans perte
          alphaQuality: 100, // Qualité maximale pour la transparence
          force: true // Forcer la conversion même si l'image est déjà en WebP
        })
        .toFile(outputPath);

      console.log(`Conversion réussie: ${imageName}.webp`);

      // Obtenir les tailles des fichiers
      const originalSize = fs.statSync(inputPath).size;
      const webpSize = fs.statSync(outputPath).size;
      const reduction = ((originalSize - webpSize) / originalSize * 100).toFixed(2);

      console.log(`Taille originale: ${(originalSize / 1024).toFixed(2)} KB`);
      console.log(`Taille WebP: ${(webpSize / 1024).toFixed(2)} KB`);
      console.log(`Réduction: ${reduction}%\n`);

    } catch (error) {
      console.error(`Erreur lors de la conversion de ${imageName}:`, error);
    }
  }
}

convertToWebP().catch(console.error); 