import { Product } from "@/entities/product";
import { Heart } from "lucide-react";
import Image from "next/image";

// Временно: пока в Product нет поля с составом, показываем моки
const MOCK_INGREDIENTS = [
  "Рис",
  "Лосось",
  "Сливочный сыр",
  "Огурец",
  "Нори",
  "Кунжут",
];

export const ProductPage = ({ product }: { product: Product }) => {
  return (
    <section className="mx-auto w-full max-w-main">
      <div className="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-331/290 overflow-hidden rounded-2xl bg-[#F7F7F8] md:rounded-3xl">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase text-white md:text-sm">
              Hit
            </span>
            <span className="rounded-full bg-[#00CC2D] px-3 py-1 text-xs font-semibold uppercase text-white md:text-sm">
              New
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold leading-tight text-[#1D1D1F] md:text-4xl">
            {product.title}
          </h1>
          <p className="mt-2 text-base font-medium text-primary md:text-lg">
            Вес: {product.weight}г
          </p>

          {product.description && (
            <p className="mt-4 text-sm text-[#686870] md:text-base">
              {product.description}
            </p>
          )}

          <div className="mt-6 rounded-2xl bg-white p-4 md:p-6">
            <h2 className="text-base font-bold text-[#1D1D1F] md:text-lg">
              Состав
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {MOCK_INGREDIENTS.map((ingredient) => (
                <li
                  key={ingredient}
                  className="flex items-center gap-1.5 rounded-full bg-[#F4F4F5] px-3 py-1.5 text-sm font-medium text-[#1D1D1F]"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#EBEBEE] pt-6 lg:mt-auto">
            <p className="mr-auto whitespace-nowrap text-2xl font-bold text-[#1D1D1F] md:text-3xl">
              {product.price}{" "}
              <span className="text-base font-medium md:text-lg">₸</span>
            </p>
            <button
              type="button"
              className="rounded-xl bg-[#00CC2D]  px-6 py-3 font-semibold text-white  transition-all hover:brightness-110 active:scale-95 md:px-8 md:py-4"
            >
              В корзину
            </button>
            <button
              type="button"
              aria-label="В избранное"
              className="flex size-12 items-center justify-center rounded-xl bg-[#fff] text-[#FF6633]  transition-colors hover:bg-primary/10 hover:text-primary md:size-14"
            >
              <Heart className="size-5 md:size-6" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h3>Может, еще кое-что?</h3>
          <span>1 из 4</span>
        </div>
      </div>
    </section>
  );
};
