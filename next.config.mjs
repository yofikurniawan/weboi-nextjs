/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "127.0.0.1",
      "img.youtube.com",
      "aptika.oganilirkab.go.id",
      "backend-weboi.superdev.id",
      "dev-backend.oganilirkab.go.id",
    ],
  },
};

export default nextConfig;
