/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  env: {
    API_URL: process.env.API_URL
  }
}

module.exports = nextConfig
