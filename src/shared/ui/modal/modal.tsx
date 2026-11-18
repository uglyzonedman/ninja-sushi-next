"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, children, className = "" }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        // клик по фону (сам <dialog>, а не контент) закрывает модалку
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto rounded-2xl bg-[#FFFFFF] p-0 shadow-[0_24px_64px_rgba(29,29,31,0.18)] backdrop:bg-[#1D1D1F]/50 backdrop:backdrop-blur-sm"
    >
      <div className={`relative p-8 ${className}`}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 flex size-9 cursor-pointer items-center justify-center bg-[#F5F5F7] text-[#1D1D1F] rounded-lg transition-colors hover:bg-[#EBEBEE]"
        >
          <X className="size-5" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
