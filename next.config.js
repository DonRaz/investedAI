/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Enable SPA-like behavior for static exports
  trailingSlash: true,
  // Optimize bundle size
  swcMinify: true,
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Add basePath if needed
  // basePath: '',
  
  // Configure custom 404 page for static exports
  experimental: {
    // This ensures our custom 404 page is used
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;