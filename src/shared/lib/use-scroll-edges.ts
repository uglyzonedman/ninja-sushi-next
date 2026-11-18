"use client";
import { useCallback, useEffect, useState, type RefObject } from "react";

/**
 * Можно ли ещё прокрутить контейнер вверх/вниз.
 * Нужен, чтобы показывать градиенты-подсказки «там есть ещё».
 */
export const useScrollEdges = (ref: RefObject<HTMLElement | null>) => {
  const [edges, setEdges] = useState({ top: false, bottom: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const top = el.scrollTop > 1;
    const bottom = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    setEdges((prev) =>
      prev.top === top && prev.bottom === bottom ? prev : { top, bottom },
    );
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    update();
    el.addEventListener("scroll", update, { passive: true });
    // размер меняется при добавлении/удалении товаров и ресайзе окна
    const observer = new ResizeObserver(update);
    observer.observe(el);
    for (const child of el.children) observer.observe(child);

    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  });

  return edges;
};
