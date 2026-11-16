import { Heart, Plus } from "lucide-react";
import Image from "next/image";
import { Product } from "../model/types";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({
  product: { description, id, image, price, title, weight },
}: ProductCardProps) => {
  return (
    <article
      key={id}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_rgba(29,29,31,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(29,29,31,0.12)]"
    >
      <div className="relative aspect-331/290 overflow-hidden bg-[#F7F7F8]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-xl font-bold text-[#1D1D1F]">{title}</h3>
        <span className="text-base font-medium text-primary">
          Вес: {weight}г
        </span>
        <p className="line-clamp-2 text-sm text-[#686870]">{description}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-2xl font-bold text-[#1D1D1F]">
            {price} <span className="text-base font-medium">₸</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="В избранное"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-[#F4F4F5] text-[#686870] transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <Heart className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Добавить в корзину"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-[0_6px_16px_rgba(255,102,51,0.35)] transition-all hover:brightness-110 active:scale-95"
            >
              <Plus className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
