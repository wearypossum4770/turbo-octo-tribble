/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  generateBuildId: async () => process.env.GIT_HASH,
  output: 'standalone',
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  images: {
    unoptimized: true,
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  trailingSlash: true,
}

module.exports = nextConfig
