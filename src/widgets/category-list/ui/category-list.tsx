"use client";

import { usePathname } from "next/navigation";

import { CategoryCard, categories } from "@/entities/category";

export function CategoryList() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-wrap gap-3 max-w-max w-full mx-auto">
      {categories.map((category) => (
        <li key={category.key}>
          <CategoryCard
            category={category}
            isActive={pathname === `/products/${category.key}`}
          />
        </li>
      ))}
    </ul>
  );
}
