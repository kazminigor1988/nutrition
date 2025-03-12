'use client';

import NutritionList from '@/components/NutritionList';
import './globals.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="relative bg-gray-900 rounded-xl shadow-2xl p-6 mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-white">
            План питания
          </h1>
          <div className="relative z-10">
            <NutritionList />
          </div>
        </div>
      </div>
    </main>
  );
}
