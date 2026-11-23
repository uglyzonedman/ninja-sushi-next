import { notFound } from "next/navigation";

import { categories } from "@/entities/category";
import { ProductsTypePage } from "@/views/products";

export default async function Page({
  params,
}: PageProps<"/products/[type]">) {
  const { type } = await params;
  const category = categories.find((item) => item.key === type);

  if (!category) notFound();

  return <ProductsTypePage category={category.key} title={category.label} />;
}
