import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
      }
    ],
  },
};

export default nextConfig;
