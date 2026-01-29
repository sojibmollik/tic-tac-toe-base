// Next.js 16 configuration tuned for Turbopack (Turbopack is used by default in Next 16)
const config = {
  // basic app dir enablement; adjust as needed
  experimental: {
    appDir: true
  },
  // Turbopack-specific (empty object ensures Turbopack mode and a clean build path)
  turbopack: {},
  // Keep other top-level minimal settings; avoid webpack overrides
  reactStrictMode: true
};

export default config;
