/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  swcMinify: false,
  reactStrictMode: false,
};

module.exports = nextConfig;
