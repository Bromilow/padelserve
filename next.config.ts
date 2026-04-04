import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["framer-motion"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
