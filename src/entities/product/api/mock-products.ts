import type { Product, ProductCategory } from "../model/types";

// Временные фото с Unsplash — заменить на свои
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;

export const mockProducts: Product[] = [
  // ───────────── Суши ─────────────
  {
    id: "1",
    category: "sushi",
    title: "Нигири лосось",
    weight: 40,
    description: "Рис, свежий лосось, васаби, соевый соус",
    price: 1190,
    image: unsplash("1615361200141-f45040f367be"),
  },
  {
    id: "2",
    category: "sushi",
    title: "Нигири ассорти",
    weight: 280,
    description: "Лосось, тунец, угорь, креветка, авокадо — 8 шт",
    price: 4590,
    image: unsplash("1611143669185-af224c5e3252"),
  },
  {
    id: "3",
    category: "sushi",
    title: "Нигири микс",
    weight: 350,
    description: "Лосось, угорь, креветка, тамаго, иноари — 10 шт",
    price: 5490,
    image: unsplash("1563612116625-3012372fccce"),
  },
  {
    id: "4",
    category: "sushi",
    title: "Нигири лосось с кунжутом",
    weight: 45,
    description: "Рис, лосось, кунжут, японский майонез",
    price: 1240,
    image: unsplash("1583623025817-d180a2221d0a"),
  },

  // ───────────── Роллы ─────────────
  {
    id: "5",
    category: "rolls",
    title: "Филадельфия классик",
    weight: 250,
    description: "Рис, нори, свежий лосось, сливочный сыр, огурец",
    price: 4290,
    image: unsplash("1579871494447-9811cf80d66c"),
  },
  {
    id: "6",
    category: "rolls",
    title: "Калифорния с икрой",
    weight: 230,
    description: "Рис, нори, лосось, огурец, авокадо, красная икра",
    price: 3490,
    image: unsplash("1580822184713-fc5400e7fe10"),
  },
  {
    id: "7",
    category: "rolls",
    title: "Спайси тунец",
    weight: 260,
    description: "Рис, нори, тунец, авокадо, огурец, спайси соус, микрозелень",
    price: 4790,
    image: unsplash("1559410545-0bdcd187e0a6"),
  },
  {
    id: "8",
    category: "rolls",
    title: "Запечённый лосось",
    weight: 240,
    description:
      "Рис, нори, лосось, сливочный сыр, сырная шапка, соус унаги, зелёный лук",
    price: 3890,
    image: unsplash("1617196035154-1e7e6e28b0db"),
  },

  // ───────────── Сеты ─────────────
  {
    id: "9",
    category: "sets",
    title: "Сет «Филадельфия»",
    weight: 750,
    description:
      "Филадельфия классик, Филадельфия с угрём, Филадельфия лайт — 24 шт",
    price: 11900,
    image: unsplash("1553621042-f6e147245754"),
  },
  {
    id: "10",
    category: "sets",
    title: "Сет «Темпура»",
    weight: 920,
    description: "Роллы в темпуре с лососем, крабом и угрём — 32 шт",
    price: 12490,
    image: unsplash("1607301405390-d831c242f59b"),
  },
  {
    id: "11",
    category: "sets",
    title: "Сет «Самурай»",
    weight: 1800,
    description: "Роллы, суши и гунканы на большую компанию — 60 шт",
    price: 24900,
    image: unsplash("1562802378-063ec186a863"),
  },
  {
    id: "12",
    category: "sets",
    title: "Сет «Ассорти»",
    weight: 320,
    description: "Филадельфия, маки с огурцом, нигири лосось, сашими — 26 шт",
    price: 6890,
    image: unsplash("1617196034796-73dfa7b1fd56"),
  },

  // ───────────── Напитки ─────────────
  {
    id: "13",
    category: "drinks",
    title: "Coca-Cola",
    weight: 500,
    description: "Классическая Coca-Cola, 0,5 л",
    price: 690,
    image: unsplash("1554866585-cd94860890b7"),
  },
  {
    id: "14",
    category: "drinks",
    title: "Чай травяной",
    weight: 400,
    description: "Травяной чай на выбор, чайник 400 мл",
    price: 890,
    image: unsplash("1576092768241-dec231879fc3"),
  },
  {
    id: "15",
    category: "drinks",
    title: "Лимонад лимон-мята",
    weight: 400,
    description: "Домашний лимонад с лимоном, лаймом и мятой",
    price: 1490,
    image: unsplash("1621263764928-df1444c5e859"),
  },
  {
    id: "16",
    category: "drinks",
    title: "Апельсиновый фреш",
    weight: 500,
    description: "Свежевыжатый апельсиновый сок",
    price: 990,
    image: unsplash("1600271886742-f049cd451bba"),
  },
];

export const getProductsByCategory = (category: ProductCategory) =>
  mockProducts.filter((product) => product.category === category);
