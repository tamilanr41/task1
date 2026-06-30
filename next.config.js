/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['localhost', 'images.unsplash.com'] },
  webpack: (config, { dev }) => {
    if (dev) config.cache = false;
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path((?!_next/static|favicon.ico).*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};
module.exports = nextConfig;