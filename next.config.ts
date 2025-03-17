import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Disables type checking during build (use with caution)
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! WARN !!
    // Disables ESLint during build (use cautiously)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
