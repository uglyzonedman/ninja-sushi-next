"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  /**
   * false — модалка не уходит в браузерный top layer (dialog.show()),
   * поэтому её перекрывают элементы с бóльшим z-index (например, хедер).
   */
  topLayer?: boolean;
  /** Только для topLayer={false}: стили/позиция белой панели внутри оверлея */
  panelClassName?: string;
  panelStyle?: CSSProperties;
};

export function Modal({
  open,
  onClose,
  children,
  className = "",
  topLayer = true,
  panelClassName = "m-auto",
  panelStyle,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      if (topLayer) dialog.showModal();
      else dialog.show();
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, topLayer]);

  // dialog.show() не закрывается по Esc сам — вешаем обработчик вручную
  useEffect(() => {
    if (!open || topLayer) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, topLayer, onClose]);

  const content = (
    <div className={`relative p-5 md:p-8 ${className}`}>
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute right-3 top-3 md:right-4 md:top-4flex size-9 cursor-pointer  justify-center bg-[#F5F5F7] text-[#1D1D1F] flex items-center rounded-lg transition-colors hover:bg-[#EBEBEE]"
      >
        <X className="size-5" />
      </button>
      {children}
    </div>
  );

  if (!topLayer) {
    return (
      <dialog
        ref={dialogRef}
        onClose={onClose}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-40 m-0 h-full max-h-none w-full max-w-none bg-[#1D1D1F]/50 p-0 backdrop-blur-sm open:flex"
      >
        <div
          style={panelStyle}
          className={`rounded-2xl bg-[#FFFFFF] shadow-[0_24px_64px_rgba(29,29,31,0.18)] ${panelClassName}`}
        >
          {content}
        </div>
      </dialog>
    );
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        // клик по фону (сам <dialog>, а не контент) закрывает модалку
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto max-w-[calc(100vw-1rem)] rounded-2xl bg-[#FFFFFF] p-0shadow-[0_24px_64px_rgba(29,29,31,0.18)] backdrop:bg-[#1D1D1F]/50 backdrop:backdrop-blur-sm"
    >
      {content}
    </dialog>
  );
}
