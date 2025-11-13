import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    staleTimes: {
      static: 10,
      dynamic: 5,
    },
  },
};

export default nextConfig;
