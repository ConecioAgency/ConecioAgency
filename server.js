const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const compression = require('compression');
const helmet = require('helmet');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Configuration du cache
const CACHE_CONTROL = {
  static: 'public, max-age=31536000, immutable',
  dynamic: 'public, max-age=3600, must-revalidate',
};

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Compression gzip/brotli
    compression({
      level: 6,
      threshold: 0,
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          return false;
        }
        return compression.filter(req, res);
      },
    })(req, res, () => {
      // Headers de sécurité
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
          },
        },
        crossOriginEmbedderPolicy: true,
        crossOriginOpenerPolicy: true,
        crossOriginResourcePolicy: { policy: "same-site" },
        dnsPrefetchControl: { allow: true },
        frameguard: { action: 'deny' },
        hidePoweredBy: true,
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        },
        ieNoOpen: true,
        noSniff: true,
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
        xssFilter: true,
      })(req, res, () => {
        // Cache Control
        if (pathname.startsWith('/_next/static/') || pathname.startsWith('/static/')) {
          res.setHeader('Cache-Control', CACHE_CONTROL.static);
        } else if (pathname.startsWith('/images/')) {
          res.setHeader('Cache-Control', CACHE_CONTROL.static);
        } else {
          res.setHeader('Cache-Control', CACHE_CONTROL.dynamic);
        }

        // Gestion des requêtes
        handle(req, res, parsedUrl);
      });
    });
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
  });
}); 