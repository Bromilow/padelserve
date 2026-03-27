import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/padelserve" : "",
  assetPrefix: isProd ? "/padelserve" : "",
  transpilePackages: ["framer-motion"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
