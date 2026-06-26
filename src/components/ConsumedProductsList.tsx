import { SelectedItem } from '@/types/nutrition';
import { categoryWithFoods } from '@/constants/nutrition-groups.constants';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ConsumedProductsListProps {
  selectedItems: SelectedItem[];
  onItemClick: (itemId: number, name: string, maxAmount: number) => void;
}

export default function ConsumedProductsList({
  selectedItems,
  onItemClick,
}: ConsumedProductsListProps) {
  const consumedItems = selectedItems.filter(item => item.amount > 0 && item.isExplicitlySelected);

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
        <Card key={category.name}>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {category.items.map((item) => (
                <li
                  key={item.itemId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent active:bg-accent/80 text-foreground"
                  onClick={() => onItemClick(item.itemId, item.name, item.maxAmount)}
                >
                  <span className="text-base sm:text-lg mb-2 sm:mb-0">{item.name}</span>
                  <div className="text-sm sm:text-base">
                    <span className="text-blue-400">
                      {item.amount}{item.unit}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
