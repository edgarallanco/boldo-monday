import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/wespages", destination: "/", permanent: true },
      { source: "/wespages/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
