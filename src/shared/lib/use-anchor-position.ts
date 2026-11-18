"use client";
import { useLayoutEffect, useState, type CSSProperties } from "react";

type Options = {
  /** CSS-селектор элемента-якоря */
  selector: string;
  /** Считать позицию только когда true (например, пока модалка открыта) */
  enabled: boolean;
  /** Отступ от нижнего края якоря, px */
  gap?: number;
};

/**
 * Возвращает стили `top`/`right`, чтобы поставить элемент
 * под якорем и выровнять по его правому краю.
 */
export const useAnchorPosition = ({
  selector,
  enabled,
  gap = 0,
}: Options): CSSProperties | undefined => {
  const [style, setStyle] = useState<CSSProperties>();

  useLayoutEffect(() => {
    if (!enabled) return;

    const update = () => {
      const anchor = document.querySelector(selector);
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      setStyle({
        top: rect.bottom + gap,
        // clientWidth без полосы прокрутки, в отличие от innerWidth
        right: document.documentElement.clientWidth - rect.right,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [selector, enabled, gap]);

  return style;
};
