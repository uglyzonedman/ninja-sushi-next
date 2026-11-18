import Image from "next/image";
import Link from "next/link";

import type { Category } from "../model/categories";

type Props = {
  category: Category;
  isActive?: boolean;
};

export function CategoryCard({ category, isActive = false }: Props) {
  return (
    <Link
      href={`/products/${category.key}`}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center gap-3 rounded-2xl border-2 bg-white px-6 py-3 text-base font-medium transition-colors hover:border-primary hover:text-primary ${
        isActive ? "border-primary text-primary" : "border-transparent text-[#1D1D1F]"
      }`}
    >
      <span className="flex size-11 items-center justify-center">
        <Image src={category.icon} alt="" className="max-h-11 w-auto" />
      </span>
      {category.label}
    </Link>
  );
}
