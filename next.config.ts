import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["framer-motion"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
