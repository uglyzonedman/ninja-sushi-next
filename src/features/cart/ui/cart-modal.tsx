"use client";
import { useRef, useState } from "react";

import { CartItemCard, type CartItem } from "@/entities/cart";
import { mockProducts } from "@/entities/product";
import { SITE_HEADER_SELECTOR } from "@/shared/config";
import { formatPrice, useAnchorPosition, useScrollEdges } from "@/shared/lib";
import { useModal } from "@/shared/model";
import { Modal } from "@/shared/ui";
import { useMe } from "@/entities/user";
import shoping_bag from "@/shared/assets/shopping-bag.svg";
import Image from "next/image";
const GAP = 8;
const BOTTOM_OFFSET = 16;
const MIN_ORDER_SUM = 2500;

const initialItems: CartItem[] = mockProducts
  .slice(0, 6)
  .map((product) => ({ product, quantity: 1 }));

export const CartModal = () => {
  const { isOpen, close } = useModal("cart-modal");
  const panelStyle = useAnchorPosition({
    selector: SITE_HEADER_SELECTOR,
    enabled: isOpen,
    gap: GAP,
  });

  const { data: me } = useMe();

  const [items, setItems] = useState<CartItem[]>(initialItems);

  const listRef = useRef<HTMLDivElement>(null);
  const scrollEdges = useScrollEdges(listRef);

  const changeQuantity = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((item) => item.product.id !== id));

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const isBelowMinimum = total < MIN_ORDER_SUM;

  return (
    <Modal
      open={isOpen}
      onClose={close}
      className="w-[calc(100vw-1rem)] md:w-[min(600px,calc(100vw-2rem))] flex flex-col min-h-0"
      topLayer={false}
      panelClassName="absolute flex flex-col overflow-hidden"
      panelStyle={
        panelStyle && {
          ...panelStyle,
          maxHeight: `calc(100dvh - ${panelStyle.top}px - ${BOTTOM_OFFSET}px)`,
        }
      }
    >
      <h3 className="text-[#1D1D1F] font-bold text-2xl md:text-3xl">
        Ваш заказ
      </h3>

      {me ? (
        <>
          <div className="relative mt-3 -mx-5 md:-mx-8 min-h-0 flex-1 flex flex-col">
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-linear-to-b from-white to-transparent transition-opacity duration-200 ${scrollEdges.top ? "opacity-100" : "opacity-0"}`}
            />
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-linear-to-t from-white to-transparent transition-opacity duration-200 ${scrollEdges.bottom ? "opacity-100" : "opacity-0"}`}
            />

            <div
              ref={listRef}
              className="scrollbar-thin max-h-[408px] min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 md:px-8 py-2 flex flex-col gap-3"
            >
              {items.length === 0 && (
                <p className="text-[#87878C] font-medium py-8 text-center">
                  Корзина пуста
                </p>
              )}
              {items.map((item) => (
                <CartItemCard
                  key={item.product.id}
                  item={item}
                  onIncrement={() => changeQuantity(item.product.id, 1)}
                  onDecrement={() => changeQuantity(item.product.id, -1)}
                  onRemove={() => removeItem(item.product.id)}
                />
              ))}
            </div>
          </div>

          <div className="-mx-5 -mb-5 md:-mx-8 md:-mb-8 mt-4 md:mt-6 shrink-0 bg-[#F5F5F7] px-5 py-4 md:px-8 md:py-6 flex flex-col gap-3">
            {isBelowMinimum && (
              <p className="text-[#FF6633] text-sm font-medium">
                Минимальная сумма заказа {formatPrice(MIN_ORDER_SUM)}. Добавьте
                ещё на {formatPrice(MIN_ORDER_SUM - total)}
              </p>
            )}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[#AEAEAE] text-sm">Итого:</p>
                <p className="text-[#1D1D1F] font-bold text-2xl md:text-3xl tabular-nums whitespace-nowrap">
                  {formatPrice(total)}
                </p>
              </div>
              <button
                type="button"
                disabled={isBelowMinimum}
                className="text-white font-medium bg-[#00CC2D] rounded-xl py-3 px-4 md:py-4 md:px-6 whitespace-nowrap transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center py-10">
          <Image src={shoping_bag} alt="shoping_bag" className="mb-6" />
          <h3 className="text-[#1D1D1F] font-bold text-xl">
            В вашей корзине пока пусто
          </h3>
          <p className="text-[#6E6E73] mt-2">
            Тут появятся товары, которые вы закажите
          </p>
          <button
            type="button"
            className="mt-6 w-full max-w-xs text-[#FFFFFF] font-semibold bg-[#00CC2D] py-4 rounded-xl"
          >
            Авторизоваться
          </button>
        </div>
      )}
    </Modal>
  );
};
