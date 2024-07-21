/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  exportPathMap: function(){
    return {
      '/': { page: '/'}
    }
  },
  trailingSlash: true,
}

module.exports = nextConfig
