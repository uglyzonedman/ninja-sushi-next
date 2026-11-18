"use client";
import { CategoryList } from "@/widgets/category-list";
import { ProductCard, mockProducts } from "@/entities/product";
import { ArrowDown } from "lucide-react";
import { useState } from "react";

type ProductsTypePageProps = {
  /** Ключ категории из URL: /products/[type] */
  category: string;
  title: string;
};

type SortOrder = "desc" | "asc";

//не трогаить

const types = ["Все", "Классические"];
//

export const ProductsTypePage = ({ category, title }: ProductsTypePageProps) => {
  const [type, setType] = useState("Все");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Временно: пока нет API, берём товары из моков
  const products = mockProducts
    .filter((product) => product.category === category)
    .sort((a, b) =>
      sortOrder === "desc" ? b.price - a.price : a.price - b.price,
    );

  const toggleSort = () =>
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));

  return (
    <div className="max-w-main w-full mx-auto flex flex-col gap-8">
      <CategoryList />

      <div>
        <h3 className="text-[#1D1D1F] font-bold text-5xl">{title}</h3>
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-2">
            {types.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setType(t)}
                aria-pressed={type === t}
                className={`${type === t ? "bg-primary text-white" : "bg-white text-[#1D1D1F] hover:text-primary"} font-medium rounded-xl py-3 px-4 transition-colors`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleSort}
            className="flex items-center gap-2 text-[#1D1D1F] font-medium transition-colors hover:text-primary"
          >
            <span>
              {sortOrder === "desc"
                ? "От дорогих к дешевым"
                : "От дешевых к дорогим"}
            </span>
            <ArrowDown
              className={`size-5 transition-transform duration-200 ${sortOrder === "asc" ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-[#87878C] font-medium py-16 text-center">
          В этой категории пока нет товаров
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
