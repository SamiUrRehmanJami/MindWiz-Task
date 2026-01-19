/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <--- This line is mandatory for Static Sites on Render
  images: {
    unoptimized: true, // Recommended so your images don't break
  },
};

module.exports = nextConfig;