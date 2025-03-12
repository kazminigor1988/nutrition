'use client';

import { useState, useEffect } from 'react';
import { categoryWithFoods } from '@/constants/nutrition-groups.constants';
import { NutritionItem, SelectedItem } from '@/types/nutrition';
import Tabs from './TabPanel';
import AmountSelectionDialog from './AmountSelectionDialog';
import AvailableProductsList from './AvailableProductsList';
import ConsumedProductsList from './ConsumedProductsList';

const STORAGE_KEY = 'nutrition-selected-items';

export default function NutritionList() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<{
    itemId: number;
    name: string;
    maxAmount: number;
    unit: string;
  } | null>(null);
  const [amount, setAmount] = useState(0);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        try {
          const parsedItems = JSON.parse(savedItems);
          setSelectedItems(parsedItems);
        } catch (error) {
          console.error('Ошибка при загрузке данных из localStorage:', error);
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }
  }, []);

  // Сохранение данных при изменении выбранных элементов
  useEffect(() => {
    if (typeof window !== 'undefined' && selectedItems.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedItems));
    }
  }, [selectedItems]);

  const getItemUnit = (item: NutritionItem) => {
    return item.weight ? 'г' : 'шт';
  };

  const handleCheckboxClick = (itemId: number, name: string, maxAmount: number) => {
    const existingItem = selectedItems.find(item => item.itemId === itemId);
    const nutritionItem = categoryWithFoods
      .flatMap(cat => cat.items)
      .find(ni => ni.itemId === itemId);
    
    // Находим категорию продукта
    const currentCategory = categoryWithFoods.find(category => 
      category.items.some(item => item.itemId === itemId)
    );

    if (!currentCategory || !nutritionItem) return;

    // Рассчитываем доступное количество
    const availableAmount = calculateAvailableAmount(nutritionItem, currentCategory.items);
    const currentAmount = existingItem?.amount || 0;
    
    // Максимальное количество - это текущее количество плюс доступный остаток
    const effectiveMaxAmount = currentAmount + availableAmount;
    
    setCurrentItem({ 
      itemId, 
      name, 
      maxAmount: effectiveMaxAmount,
      unit: getItemUnit(nutritionItem)
    });
    setAmount(currentAmount);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentItem(null);
  };

  const handleConfirm = () => {
    if (currentItem) {
      const existingItemIndex = selectedItems.findIndex(item => item.itemId === currentItem.itemId);
      
      // Находим категорию текущего продукта
      const currentCategory = categoryWithFoods.find(category => 
        category.items.some(item => item.itemId === currentItem.itemId)
      );

      if (!currentCategory) return;

      // Получаем предыдущее значение количества
      const previousAmount = existingItemIndex >= 0 ? selectedItems[existingItemIndex].amount : 0;
      
      // Рассчитываем разницу между новым и предыдущим значением
      const amountDifference = amount - previousAmount;

      // Проверяем общий процент потребления по группе
      const categoryItems = currentCategory.items;
      const totalPercentage = categoryItems.reduce((acc, item) => {
        const existingItem = selectedItems.find(si => si.itemId === item.itemId);
        const itemMaxAmount = getItemMaxAmount(item);
        const itemAmount = item.itemId === currentItem.itemId 
          ? amount 
          : (existingItem?.amount || 0);
        return acc + (itemAmount / itemMaxAmount) * 100;
      }, 0);

      // Если общий процент превышает 100%, отменяем изменение
      if (totalPercentage > 100) {
        alert('Нельзя съесть больше 100% продуктов из группы');
        return;
      }

      // Обновляем или добавляем текущий продукт
      const updatedItems = [...selectedItems];
      if (existingItemIndex >= 0) {
        updatedItems[existingItemIndex] = {
          itemId: currentItem.itemId,
          amount,
          maxAmount: currentItem.maxAmount,
          isExplicitlySelected: true,
          unit: currentItem.unit
        };
      } else {
        updatedItems.push({
          itemId: currentItem.itemId,
          amount,
          maxAmount: currentItem.maxAmount,
          isExplicitlySelected: true,
          unit: currentItem.unit
        });
      }

      setSelectedItems(updatedItems);
      handleDialogClose();
    }
  };

  const getItemMaxAmount = (item: NutritionItem) => {
    return item.weight || item.amount || 0;
  };

  const getCategoryPercentage = (categoryItems: NutritionItem[]) => {
    return categoryItems.reduce((acc, item) => {
      const existingItem = selectedItems.find(si => si.itemId === item.itemId);
      const itemMaxAmount = getItemMaxAmount(item);
      const itemAmount = existingItem?.amount || 0;
      return acc + (itemAmount / itemMaxAmount) * 100;
    }, 0);
  };

  const getAvailablePercentage = (categoryItems: NutritionItem[]) => {
    const consumedPercentage = getCategoryPercentage(categoryItems);
    return Math.max(0, 100 - consumedPercentage);
  };

  const calculateAvailableAmount = (item: NutritionItem, categoryItems: NutritionItem[]) => {
    const availablePercentage = getAvailablePercentage(categoryItems);
    const maxAmount = getItemMaxAmount(item);
    return Math.floor((maxAmount * availablePercentage) / 100);
  };

  const enrichCategoriesWithAvailableAmounts = (categories: typeof categoryWithFoods) => {
    return categories.map(category => ({
      name: category.category,
      availablePercentage: getAvailablePercentage(category.items),
      items: category.items.map(item => ({
        ...item,
        availableAmount: calculateAvailableAmount(item, category.items)
      }))
    }));
  };

  const tabs = [
    {
      name: "Доступні",
      content: (
        <AvailableProductsList
          categories={enrichCategoriesWithAvailableAmounts(
            categoryWithFoods.filter(category => {
              const percentage = getCategoryPercentage(category.items);
              return percentage < 100;
            })
          )}
          selectedItems={selectedItems}
          onItemClick={handleCheckboxClick}
        />
      )
    },
    ...(selectedItems.some(item => item.amount > 0 && item.isExplicitlySelected)
      ? [{
          name: "З'їдені",
          content: (
            <ConsumedProductsList
              selectedItems={selectedItems}
              onItemClick={handleCheckboxClick}
            />
          )
        }]
      : [])
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs tabs={tabs} />
      <AmountSelectionDialog
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleConfirm}
        itemName={currentItem?.name || ''}
        amount={amount}
        maxAmount={currentItem?.maxAmount || 0}
        unit={currentItem?.unit || ''}
        onAmountChange={setAmount}
      />
    </div>
  );
} 