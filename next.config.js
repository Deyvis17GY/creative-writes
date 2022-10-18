/** @type {import('next').NextConfig} */

const isDevelopment = process.env.NODE_ENV !== 'production'

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
})

const nextConfig = {
  assetPrefix: isDevelopment ? 'creative-writes' : '',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: [
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'i.pravatar.cc'
    ]
  }
}

module.exports = withPWA(nextConfig)
