import { create } from "zustand";

/** Все модалки приложения. Новую модалку — добавь сюда id. */
export type ModalId = "auth";

type ModalState = {
  opened: Partial<Record<ModalId, boolean>>;
  openModal: (id: ModalId) => void;
  closeModal: (id: ModalId) => void;
  toggleModal: (id: ModalId) => void;
  closeAll: () => void;
};

export const useModalStore = create<ModalState>()((set) => ({
  opened: {},
  openModal: (id) => set((s) => ({ opened: { ...s.opened, [id]: true } })),
  closeModal: (id) => set((s) => ({ opened: { ...s.opened, [id]: false } })),
  toggleModal: (id) =>
    set((s) => ({ opened: { ...s.opened, [id]: !s.opened[id] } })),
  closeAll: () => set({ opened: {} }),
}));

/** Удобный хук для одной модалки: const auth = useModal("auth") */
export const useModal = (id: ModalId) => {
  const isOpen = useModalStore((s) => !!s.opened[id]);
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);
  const toggleModal = useModalStore((s) => s.toggleModal);

  return {
    isOpen,
    open: () => openModal(id),
    close: () => closeModal(id),
    toggle: () => toggleModal(id),
  };
};
