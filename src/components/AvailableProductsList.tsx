import { NutritionCategory, NutritionItem, SelectedItem } from '@/types/nutrition';
import { Disclosure, Transition } from '@headlessui/react';

interface Props {
  categories: {
    name: string;
    items: Array<{
      itemId: number;
      name: string;
      weight?: number;
      amount?: number;
      availableAmount: number;
    }>;
    availablePercentage: number;
  }[];
  selectedItems: SelectedItem[];
  onItemClick: (itemId: number, name: string, maxAmount: number) => void;
}

export default function AvailableProductsList({ categories, selectedItems, onItemClick }: Props) {
  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.name} className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white">{category.name}</h3>
            <span className="text-sm sm:text-base text-gray-400">
              {category.availablePercentage.toFixed(0)}%
            </span>
          </div>
          <ul className="space-y-3">
            {category.items.map((item) => {
              const maxAmount = item.weight || item.amount || 0;
              const selectedItem = selectedItems.find(si => si.itemId === item.itemId);
              const consumedAmount = selectedItem?.amount || 0;
              const unit = item.weight ? 'г' : 'шт';

              return (
                <li 
                  key={item.itemId} 
                  className="flex flex-row justify-between p-3 hover:bg-gray-700 rounded-lg cursor-pointer active:bg-gray-600 transition-colors"
                  onClick={() => onItemClick(item.itemId, item.name, maxAmount)}
                >
                  <span className="text-white text-base sm:text-lg mb-2 sm:mb-0">{item.name}</span>
                  <div className="text-sm sm:text-base space-y-1 space-x-4">
                    <span className="text-emerald-400">{item.availableAmount}{unit}</span>
                    {consumedAmount > 0 && (
                      <span className="text-blue-400 block inline">
                        {consumedAmount}{unit}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
} 