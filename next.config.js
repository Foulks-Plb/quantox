/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  build: {
    extend(config, {}) {
        config.node = {
            fs: 'empty'
        }
    }
  }
}

module.exports = nextConfig
