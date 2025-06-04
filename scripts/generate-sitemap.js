const fs = require('fs');
const path = require('path');

// Pages principales
const mainUrls = [
  { loc: 'https://www.conecio.com/', changefreq: 'weekly', priority: '1.0' },
  { loc: 'https://www.conecio.com/services', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://www.conecio.com/pricing', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://www.conecio.com/blog', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://www.conecio.com/contact', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://www.conecio.com/faq', changefreq: 'monthly', priority: '0.5' },
];

// Extraction des slugs depuis data/blogArticles.ts
const articlesPath = path.join(__dirname, '../data/blogArticles.ts');
const fileContent = fs.readFileSync(articlesPath, 'utf-8');
const slugRegex = /slug:\s*['"]([\w\-]+)['"]/g;
const slugs = [];
let match;
while ((match = slugRegex.exec(fileContent)) !== null) {
  slugs.push(match[1]);
}

// Génération des URLs d'articles
const blogUrls = slugs.map(slug => `  <url>\n    <loc>https://www.conecio.com/blog/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`).join('\n');

// Génération du sitemap complet
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${mainUrls.map(url => `  <url>\n    <loc>${url.loc}</loc>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`).join('\n')}\n${blogUrls}\n</urlset>\n`;

// Écriture du fichier sitemap.xml
const outPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, sitemap, 'utf-8');
console.log('✅ sitemap.xml généré avec succès !'); 