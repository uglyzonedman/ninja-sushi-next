import { mockProducts } from "@/entities/product";
import { ProductPage } from "@/views/products";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: PageProps<"/products/[type]/[id]">) {
  const { id } = await params;

  const product = mockProducts.find((item) => item.id == id);

  if (!product) notFound();

  return <ProductPage product={product} />;
}
