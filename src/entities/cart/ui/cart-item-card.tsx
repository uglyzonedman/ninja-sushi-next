import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

import { formatPrice } from "@/shared/lib";

import type { CartItem } from "../model/types";

type CartItemCardProps = {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

export const CartItemCard = ({
  item: {
    product: { title, weight, price, image },
    quantity,
  },
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemCardProps) => {
  return (
    <div className="flex items-center justify-between bg-[#F5F5F7] rounded-xl p-4 relative">
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Удалить «${title}» из корзины`}
        className="bg-white text-[#1d1d1f] p-1.5 rounded-full absolute -left-3 shadow-sm transition-colors hover:text-[#FF6633]"
      >
        <X className="size-4" />
      </button>
      <div className="flex items-center gap-3 min-w-0">
        <Image
          width={58}
          height={58}
          src={image}
          alt={title}
          className="size-[58px] shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <h3 className="text-[#1D1D1F] font-bold truncate">{title}</h3>
          <span className="text-[#FF6633] text-sm font-medium">
            Вес: {weight}г
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col items-end min-w-24 tabular-nums">
          <span className="text-[#1D1D1F] font-bold whitespace-nowrap">
            {formatPrice(price * quantity)}
          </span>
          {quantity > 1 && (
            <span className="text-[#87878C] text-xs font-medium whitespace-nowrap">
              {formatPrice(price)} × {quantity}
            </span>
          )}
        </div>
        <div className="flex items-center ml-3">
          <button
            type="button"
            onClick={onDecrement}
            disabled={quantity <= 1}
            aria-label="Уменьшить количество"
            className="bg-white rounded-lg text-[#1D1D1F] p-2 disabled:opacity-40"
          >
            <Minus />
          </button>
          <span className="text-[#1D1D1F] text-sm font-medium min-w-8 text-center tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            onClick={onIncrement}
            aria-label="Увеличить количество"
            className="bg-white rounded-lg text-[#1D1D1F] p-2"
          >
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
};
