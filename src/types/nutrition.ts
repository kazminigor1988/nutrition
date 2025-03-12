export interface NutritionItem {
  itemId: number;
  name: string;
  weight?: number;
  amount?: number;
}

export interface NutritionCategory {
  categoryId: number;
  category: string;
  items: NutritionItem[];
}

export interface SelectedItem {
  itemId: number;
  amount: number;
  maxAmount: number;
  isExplicitlySelected: boolean;
  unit: string;
} 