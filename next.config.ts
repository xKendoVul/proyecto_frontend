/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wallpapers.com",
      },
      {
        protocol: "https",
        hostname: "images.vexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn4.iconfinder.com",
      },
      {
        protocol: "https",
        hostname: "images.cdn3.buscalibre.com"
      },
      {
        protocol: "https",
        hostname: "proassetspdlcom.cdnstatics2.com"
      }
    ],
  },
};

export default nextConfig;