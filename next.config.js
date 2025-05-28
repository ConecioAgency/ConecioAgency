/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'raw.githubusercontent.com', 'github.com','conecio-agency.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'conecio-agency.vercel.app',
      },
    ],
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
}

module.exports = nextConfig 