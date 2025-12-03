/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ['ru', 'en', 'pl', 'uk'],
    defaultLocale: 'ru',
  },
}

module.exports = nextConfig
