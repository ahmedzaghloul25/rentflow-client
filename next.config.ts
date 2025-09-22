import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //  async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3100/:path*', // Proxy to your local NestJS backend
  //     },
  //   ];
  // },
  // allowedDevOrigins: ['d6225cb0791c.ngrok-free.app to /_next/*']
};

export default nextConfig;