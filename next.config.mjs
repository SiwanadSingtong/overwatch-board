/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "overfast-api.tekrop.fr",
      },
      {
        protocol: "https",
        hostname: "d15f34w2p8l1cc.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "**.blzstatic.cn",
      },
      {
        protocol: "https",
        hostname: "**.battle.net",
      },
      {
        protocol: "https",
        hostname: "blz-contentstack-images.akamaized.net",
      },
    ],
  },
};

export default nextConfig;
