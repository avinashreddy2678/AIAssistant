/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ai-assistant26.vercel.app',
      },
    ],
  },
}

module.exports = nextConfig;
