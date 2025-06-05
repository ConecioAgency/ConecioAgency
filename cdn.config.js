module.exports = {
  // Configuration du CDN
  cdn: {
    // Domaine du CDN
    domain: process.env.CDN_DOMAIN || 'cdn.conecio.com',
    
    // Configuration des ressources statiques
    static: {
      // Dossier des ressources statiques
      directory: 'public',
      
      // Types de fichiers à servir via le CDN
      fileTypes: [
        'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif',
        'css', 'js', 'woff', 'woff2', 'ttf', 'eot',
        'mp4', 'webm', 'ogg', 'mp3', 'wav'
      ],
      
      // Configuration du cache
      cache: {
        // Durée de mise en cache (en secondes)
        maxAge: 31536000, // 1 an
        
        // En-têtes de cache
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Vary': 'Accept-Encoding',
        },
      },
    },
    
    // Configuration de l'optimisation des images
    images: {
      // Formats d'image supportés
      formats: ['webp', 'avif'],
      
      // Tailles d'image prédéfinies
      sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      
      // Qualité de compression
      quality: 80,
    },
  },
  
  // Configuration de la sécurité
  security: {
    // En-têtes de sécurité
    headers: {
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
}; 