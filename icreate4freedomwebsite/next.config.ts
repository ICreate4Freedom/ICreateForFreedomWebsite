import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // React <ViewTransition> route crossfades (no-op in unsupported browsers)
    viewTransition: true,
  },
};

export default nextConfig;
