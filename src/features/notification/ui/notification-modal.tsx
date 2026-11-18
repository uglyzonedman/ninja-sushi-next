"use client";
import { SITE_HEADER_SELECTOR } from "@/shared/config";
import { useAnchorPosition } from "@/shared/lib";
import { useModal } from "@/shared/model";
import { Modal } from "@/shared/ui";

const GAP = 8;

const BOTTOM_OFFSET = 16;

export const NotificationModal = () => {
  const { isOpen, close } = useModal("notification-modal");

  const panelStyle = useAnchorPosition({
    selector: SITE_HEADER_SELECTOR,
    enabled: isOpen,
    gap: GAP,
  });
  return (
    <Modal
      open={isOpen}
      onClose={close}
      className="w-[600px] flex flex-col min-h-0"
      topLayer={false}
      panelClassName="absolute flex flex-col overflow-hidden"
      panelStyle={
        panelStyle && {
          ...panelStyle,
          maxHeight: `calc(100dvh - ${panelStyle.top}px - ${BOTTOM_OFFSET}px)`,
        }
      }
    >
      <h3 className="text-[#1D1D1F] font-bold text-3xl">Уведомления</h3>

      <div>
        <div className="bg-[#F5F5F7] rounded-xl p-4">
          <h3>
            Итальянская полиция обнаружила картину Тициана, исчезнувшую в 2004
            году
          </h3>
          <p>16.02 в 16:40</p>
        </div>
      </div>
    </Modal>
  );
};
