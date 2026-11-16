import type { StaticImageData } from "next/image";

export type ProductCategory = "sushi" | "rolls" | "sets" | "drinks";

export type Product = {
  id: string;
  category: ProductCategory;
  title: string;
  weight: number;
  description: string;
  price: number;
  image: StaticImageData | string;
};
