/** @type {import('next').NextConfig} */

const isDevelopment = process.env.NODE_ENV !== 'production'
const { version } = require('./package.json')

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: [
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'i.pravatar.cc'
    ]
  },
  publicRuntimeConfig: {
    version
  }
}

module.exports = withPWA(nextConfig)
