import { SelectedItem } from '@/types/nutrition';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
        <Card key={category.name}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg sm:text-xl">{category.name}</CardTitle>
              <span className="text-sm sm:text-base text-muted-foreground">
                {category.availablePercentage.toFixed(0)}%
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {category.items.map((item) => {
                const maxAmount = item.weight || item.amount || 0;
                const selectedItem = selectedItems.find(si => si.itemId === item.itemId);
                const consumedAmount = selectedItem?.amount || 0;
                const unit = item.weight ? 'г' : 'шт';

                return (
                  <li
                    key={item.itemId}
                    className="flex flex-row justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent active:bg-accent/80 text-foreground"
                    onClick={() => onItemClick(item.itemId, item.name, maxAmount)}
                  >
                    <span className="text-base sm:text-lg mb-2 sm:mb-0">{item.name}</span>
                    <div className="text-sm sm:text-base space-y-1 space-x-4">
                      {consumedAmount > 0 && (
                        <span className="text-blue-400 block inline">
                          {consumedAmount}{unit}
                        </span>
                      )}
                      <span className="text-emerald-400">{item.availableAmount}{unit}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
