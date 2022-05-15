/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  images: {
    domains: ["picsum.photos", "media.valorant-api.com"],
    formats: ["image/avif", "image/webp"],
  },
};
