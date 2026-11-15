"use client";

import { useState } from "react";
import { CategoryCard, categories } from "@/entities/category";

export function CategoryList() {
  const [activeKey, setActiveKey] = useState(categories[0].key);

  return (
    <ul className="flex flex-wrap gap-3 max-w-max w-full mx-auto">
      {categories.map((category) => (
        <li key={category.key}>
          <CategoryCard
            category={category}
            isActive={category.key === activeKey}
            onClick={() => setActiveKey(category.key)}
          />
        </li>
      ))}
    </ul>
  );
}
