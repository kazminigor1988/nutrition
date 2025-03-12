/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export',
  basePath: '/nutrition', // Укажи название репозитория
  images: {
    unoptimized: true, // Отключает оптимизацию изображений (GitHub Pages не поддерживает API Next.js)
  },
};

export default nextConfig;
