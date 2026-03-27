import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/padelserve",
  assetPrefix: "/padelserve",
  transpilePackages: ["framer-motion"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
