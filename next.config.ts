import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['zfenjffayhlwvfnohulv.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blogger.googleusercontent.com',
        pathname: '/img/b/**',
      },
    ],
  },
};

export default nextConfig;
