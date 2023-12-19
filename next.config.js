/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    images: {
      domains: ['ai-assistant26.vercel.app'], // Add domains for images (required for external images)
      deviceSizes: [320, 420, 768, 1024, 1200], // Default device sizes for image optimization
    },
  },
}

module.exports = nextConfig;
