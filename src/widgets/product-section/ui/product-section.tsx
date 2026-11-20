import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProductCard } from "@/entities/product";

import type { ProductSectionProps } from "../model/types";

export const ProductSection = ({
  href,
  products,
  title,
}: ProductSectionProps) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 max-w-main w-full mx-auto">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F]">
          {title}
        </h2>
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-2 text-sm md:text-base font-medium text-primary transition-opacity hover:opacity-70"
        >
          Смотреть все
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
