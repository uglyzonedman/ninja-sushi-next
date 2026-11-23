import { Heart, Plus } from "lucide-react";
import Image from "next/image";
import { Product } from "../model/types";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({
  product: { description, id, image, price, title, weight, category },
}: ProductCardProps) => {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-[0_4px_24px_rgba(29,29,31,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(29,29,31,0.12)]"
    >
      <div className="relative aspect-331/290 overflow-hidden bg-[#F7F7F8]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3 sm:gap-2 md:p-5">
        <h3 className="text-base sm:text-lg md:text-xl font-bold leading-tight text-[#1D1D1F]">
          {/* Растянутая ссылка: after-псевдоэлемент делает кликабельной всю карточку */}
          <Link
            href={`/products/${category}/${id}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {title}
          </Link>
        </h3>
        <span className="text-sm md:text-base font-medium text-primary">
          Вес: {weight}г
        </span>
        <p className="line-clamp-2 text-xs md:text-sm text-[#686870]">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2 md:pt-4">
          <p className="text-lg md:text-2xl font-bold text-[#1D1D1F] whitespace-nowrap">
            {price} <span className="text-sm md:text-base font-medium">₸</span>
          </p>

          {/* relative z-10 — кнопки над растянутой ссылкой, клик не уходит в переход */}
          <div className="relative z-10 flex items-center gap-1.5 md:gap-2">
            <button
              type="button"
              aria-label="В избранное"
              className="flex size-9 md:size-11 cursor-pointer items-center justify-center rounded-full bg-[#F4F4F5] text-[#686870] transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <Heart className="size-4 md:size-5" />
            </button>
            <button
              type="button"
              aria-label="Добавить в корзину"
              className="flex size-9 md:size-11 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-[0_6px_16px_rgba(255,102,51,0.35)] transition-all hover:brightness-110 active:scale-95"
            >
              <Plus className="size-4 md:size-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
