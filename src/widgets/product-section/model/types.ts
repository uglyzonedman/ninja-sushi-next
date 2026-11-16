import { Product } from "@/entities/product";

export type ProductSectionProps = {
  title: string;
  href: string;
  products: Product[];
};
