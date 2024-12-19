/** @type {import('next').NextConfig} */
const nextConfig = {

  async headerd() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-Requested-With, Content-Type, Accept, Origin, Authorization" },
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
