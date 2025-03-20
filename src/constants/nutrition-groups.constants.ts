import { NutritionCategory } from '@/types/nutrition';

export const categoryWithFoodsTakeWeight: NutritionCategory[] = [
  {
    categoryId: 1,
    category: "Перше",
    items: [
      { itemId: 1, name: "Бобові", weight: 210 },
      { itemId: 2, name: "Картопля", weight: 660 },
      { itemId: 3, name: "Кукурудза свіжа", weight: 660 },
      { itemId: 4, name: "Пластівці", weight: 210 },
      { itemId: 5, name: "Булгур", weight: 210 },
      { itemId: 6, name: "Гречка", weight: 210 },
      { itemId: 7, name: "Рис (не шліфований)", weight: 210 },
      { itemId: 8, name: "Будь-яка крупа", weight: 210 },
      { itemId: 9, name: "Цільнозернове борошно", weight: 210 },
      { itemId: 10, name: "Хлібці", weight: 345 },
      { itemId: 11, name: "Цільнозерновий хліб", weight: 345 },
      { itemId: 12, name: "Макарони т.с.", weight: 210 },
      { itemId: 13, name: "Лаваш", weight: 345 },
    ],
  },
  {
    categoryId: 2,
    category: "Молочка 1",
    items: [
      { itemId: 14, name: "Молоко 2.5%", weight: 250 },
      { itemId: 15, name: "Кефір 2.5%", weight: 250 },
      { itemId: 16, name: "Несолодкий йогурт 1.5%", weight: 250 },
    ],
  },
  {
    categoryId: 3,
    category: "Солодощі",
    items: [{ itemId: 17, name: "Солодощі", weight: 115 }],
  },
  {
    categoryId: 4,
    category: "М'ясне",
    items: [
      { itemId: 18, name: "Телятина", weight: 320 },
      { itemId: 19, name: "Печінка", weight: 320 },
      { itemId: 20, name: "Куряче або індиче філе", weight: 340 },
      { itemId: 21, name: "Риба (до 5% жиру)", weight: 320 },
      { itemId: 22, name: "Риба (від 5% жиру)", weight: 220 },
      { itemId: 23, name: "Яйця", amount: 6 },
      { itemId: 24, name: "Морепродукти", weight: 400 },
    ],
  },
  {
    categoryId: 5,
    category: "Соуси",
    items: [
      { itemId: 25, name: "Олія", weight: 28 },
      { itemId: 26, name: "Майонез", weight: 36 },
      { itemId: 27, name: "Авокадо", weight: 110 },
      { itemId: 28, name: "Оливки", weight: 130 },
      { itemId: 29, name: "Гірчиця", weight: 52 },
      { itemId: 30, name: "Кетчуп", weight: 78 },
      { itemId: 43, name: "Сметана", weight: 90 },
    ],
  },
  {
    categoryId: 6,
    category: "Молочка 2",
    items: [
      { itemId: 31, name: "Сир зернистий (творог) 5%", weight: 160 },
      { itemId: 32, name: "Сири м'які, тверді, плавлені", weight: 55 },
      { itemId: 33, name: "Сметана 15%", weight: 110 },
      { itemId: 34, name: "Масло", weight: 27 },
      { itemId: 35, name: "Сало", weight: 19 },
      { itemId: 36, name: "Кефір 2.5%", weight: 360 },
      { itemId: 37, name: "Несолодкий йогурт 1.6%", weight: 370 },
      { itemId: 38, name: "Молоко 2.5%", weight: 360 },
    ],
  },
  {
    categoryId: 7,
    category: "Фрукти",
    items: [{ itemId: 39, name: "Фрукти та ягоди", weight: 700 }],
  },
  {
    categoryId: 8,
    category: "Горіхи",
    items: [
      { itemId: 40, name: "Горіхи", weight: 30 },
      { itemId: 41, name: "Насіння", weight: 30 },
    ],
  },
  {
    categoryId: 9,
    category: "Овочі",
    items: [{ itemId: 42, name: "Овочі", weight: 600 }],
  },
];


export const categoryWithFoods: NutritionCategory[] = [
  {
    categoryId: 1,
    category: "Перше",
    items: [
      { itemId: 1, name: "Бобові", weight: 80 }, // 40г * 2 приема
      { itemId: 2, name: "Картопля", weight: 280 }, // 140г * 2 приема
      { itemId: 3, name: "Кукурудза свіжа", weight: 280 }, // 140г * 2 приема
      { itemId: 4, name: "Пластівці", weight: 80 }, // 40г * 2 приема
      { itemId: 5, name: "Булгур", weight: 80 },
      { itemId: 6, name: "Гречка", weight: 80 },
      { itemId: 7, name: "Рис (не шліфований)", weight: 80 },
      { itemId: 8, name: "Будь-яка крупа", weight: 80 },
      { itemId: 9, name: "Цільнозернове борошно", weight: 80 },
      { itemId: 10, name: "Хлібці", weight: 120 }, // 60г * 2 приема
      { itemId: 11, name: "Цільнозерновий хліб", weight: 130 }, // 65г * 2 приема
      { itemId: 12, name: "Макарони т.с.", weight: 80 },
      { itemId: 13, name: "Лаваш", weight: 120 }, // 60г * 2 приема
    ],
  },
  {
    categoryId: 2,
    category: "Молочка 1",
    items: [
      { itemId: 14, name: "Молоко 2.5%", weight: 200 },
      { itemId: 15, name: "Кефір 2.5%", weight: 200 },
      { itemId: 16, name: "Несолодкий йогурт 1.5%", weight: 200 },
    ],
  },
  {
    categoryId: 3,
    category: "Солодощі",
    items: [{ itemId: 17, name: "Солодощі", weight: 60 }], // 60г за прием
  },
  {
    categoryId: 4,
    category: "М'ясне",
    items: [
      { itemId: 18, name: "Телятина", weight: 280 }, // 140г * 2 приема
      { itemId: 19, name: "Печінка", weight: 280 }, // 140г * 2 приема
      { itemId: 20, name: "Куряче або індиче філе", weight: 320 }, // 160г * 2 приема
      { itemId: 21, name: "Риба (до 5% жиру)", weight: 350 }, // 175г * 2 приема
      { itemId: 22, name: "Риба (від 5% жиру)", weight: 230 }, // 115г * 2 приема
      { itemId: 23, name: "Яйця", amount: 6 }, // 3 яйця * 2 приема
      { itemId: 24, name: "Морепродукти", weight: 380 }, // 190г * 2 приема
    ],
  },
  {
    categoryId: 5,
    category: "Соуси",
    items: [
      { itemId: 25, name: "Олія", weight: 20 }, // 10г * 2 приема
      { itemId: 26, name: "Майонез", weight: 26 }, // 13г * 2 приема
      { itemId: 27, name: "Авокадо", weight: 110 }, // 55г * 2 приема
      { itemId: 28, name: "Оливки", weight: 140 }, // 70г * 2 приема
      { itemId: 29, name: "Гірчиця", weight: 48 }, // 24г * 2 приема
      { itemId: 30, name: "Кетчуп", weight: 72 }, // 36г * 2 приема
      { itemId: 30, name: "Cметана", weight: 98 }, // 49г * 2 приема
    ],
  },
  {
    categoryId: 6,
    category: "Молочка 2",
    items: [
      { itemId: 31, name: "Сир зернистий (творог) 5%", weight: 150 },
      { itemId: 32, name: "Сири м'які, тверді, плавлені", weight: 50 },
      { itemId: 33, name: "Сметана 15%", weight: 100 },
      { itemId: 34, name: "Масло", weight: 25 },
      { itemId: 35, name: "Сало", weight: 18 },
      { itemId: 36, name: "Кефір 2.5%", weight: 320 },
      { itemId: 37, name: "Несолодкий йогурт 1.6%", weight: 350 },
      { itemId: 38, name: "Молоко 2.5%", weight: 320 },
    ],
  },
  {
    categoryId: 7,
    category: "Фрукти",
    items: [{ itemId: 39, name: "Фрукти та ягоди", weight: 220 }],
  },
  {
    categoryId: 8,
    category: "Горіхи",
    items: [
      { itemId: 40, name: "Горіхи", weight: 15 },
      { itemId: 41, name: "Насіння", weight: 15 },
    ],
  },
  {
    categoryId: 9,
    category: "Овочі",
    items: [{ itemId: 42, name: "Овочі", weight: 600 }], // 300г * 2 приема
  },
];