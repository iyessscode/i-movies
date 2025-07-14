import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
