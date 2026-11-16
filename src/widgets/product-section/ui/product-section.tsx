import Link from "next/link";
import { ProductSectionProps } from "../model/types";
import { ProductCard } from "@/entities/product";

export const ProductSection = ({
  href,
  products,
  title,
}: ProductSectionProps) => {
  return (
    <div className="flex flex-col gap-6 max-w-main w-full mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#1D1D1F]">{title}</h2>
        <Link
          href={href}
          className="text-base font-medium text-primary transition-opacity hover:opacity-70"
        >
          Смотреть все
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
