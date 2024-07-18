/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nawyimages.s3.eu-north-1.amazonaws.com",
        pathname: "**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
