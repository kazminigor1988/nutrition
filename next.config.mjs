/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export',
  basePath: '/nutrition', // Вкажи назву репозиторію
  images: {
    unoptimized: true, // Вимикає оптимізацію зображень (GitHub Pages не підтримує API Next.js)
  },
};

export default nextConfig;
