import { Roboto } from 'next/font/google';

// Configuration de la police Roboto avec préchargement
export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-roboto',
  adjustFontFallback: true,
}); 