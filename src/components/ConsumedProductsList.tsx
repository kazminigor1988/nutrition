import { NutritionItem, SelectedItem } from '@/types/nutrition';
import { categoryWithFoods } from '@/constants/nutrition-groups.constants';

interface ConsumedProductsListProps {
  selectedItems: SelectedItem[];
  onItemClick: (itemId: number, name: string, maxAmount: number) => void;
}

export default function ConsumedProductsList({
  selectedItems,
  onItemClick,
}: ConsumedProductsListProps) {
  const consumedItems = selectedItems.filter(item => item.amount > 0 && item.isExplicitlySelected);

  // Группируем съеденные продукты по категориям
  const groupedConsumedItems = categoryWithFoods.map(category => {
    const categoryConsumedItems = category.items
      .map(item => {
        const consumedItem = consumedItems.find(ci => ci.itemId === item.itemId);
        if (!consumedItem) return null;
        return {
          ...item,
          amount: consumedItem.amount,
          maxAmount: consumedItem.maxAmount,
          unit: item.weight ? 'г' : 'шт'
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    return {
      name: category.category,
      items: categoryConsumedItems
    };
  }).filter(category => category.items.length > 0);

  return (
    <div className="space-y-6">
      {groupedConsumedItems.map((category) => (
        <div key={category.name} className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{category.name}</h3>
          <ul className="space-y-3">
            {category.items.map((item) => (
              <li
                key={item.itemId}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-gray-700 rounded-lg cursor-pointer active:bg-gray-600 transition-colors"
                onClick={() => onItemClick(item.itemId, item.name, item.maxAmount)}
              >
                <span className="text-white text-base sm:text-lg mb-2 sm:mb-0">{item.name}</span>
                <div className="text-sm sm:text-base">
                  <span className="text-blue-400">
                    {item.amount}{item.unit}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
} 