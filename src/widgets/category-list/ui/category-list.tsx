"use client";

import { usePathname } from "next/navigation";

import { CategoryCard, categories } from "@/entities/category";

export function CategoryList() {
  const pathname = usePathname();

  return (
    <ul className="scrollbar-none flex gap-2 overflow-x-auto md:flex-wrap md:gap-3 md:overflow-visible max-w-max w-full mx-auto">
      {categories.map((category) => (
        <li key={category.key} className="shrink-0">
          <CategoryCard
            category={category}
            isActive={pathname === `/products/${category.key}`}
          />
        </li>
      ))}
    </ul>
  );
}
