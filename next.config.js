/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    pageExtensions: ['page.tsx', 'page.ts'],
    swcMinify: true,
    reactStrictMode: true,
    images: {
        domains: ['localhost','oaidalleapiprodscus.blob.core.windows.net'],
      },
};

module.exports = nextConfig;
