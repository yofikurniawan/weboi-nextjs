/** @type {import('next').NextConfig} */
const nextConfig = {

  async rewrites() {
    return [
      {
        source: "/api/:path*", // Path API di Next.js
        destination: "http://dev.oganilirkab.go.id/api/:path*", // URL backend Laravel
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization",
          },
        ],
      },
    ];
  },

  reactStrictMode: true,
  images: {
    domains: [
      "127.0.0.1",
      "img.youtube.com",
      "aptika.oganilirkab.go.id",
      "backend-weboi.superdev.id",
      "dev-backend.oganilirkab.go.id",
      "oganilirkab.go.id",
    ],
  },
};

export default nextConfig;
