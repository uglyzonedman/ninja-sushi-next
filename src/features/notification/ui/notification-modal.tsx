"use client";
import { useRef, useState } from "react";

import {
  NotificationCard,
  mockNotifications,
  type Notification,
} from "@/entities/notification";
import { useMe } from "@/entities/user";
import { SITE_HEADER_SELECTOR } from "@/shared/config";
import { useAnchorPosition, useScrollEdges } from "@/shared/lib";
import { useModal } from "@/shared/model";
import { Modal } from "@/shared/ui";

/** Отступ между нижним краем хедера и модалкой, px */
const GAP = 8;
/** Отступ модалки от нижнего края экрана, px */
const BOTTOM_OFFSET = 16;

export const NotificationModal = () => {
  const { isOpen, close } = useModal("notification-modal");
  const authModal = useModal("auth");
  const { data: me } = useMe();
  const panelStyle = useAnchorPosition({
    selector: SITE_HEADER_SELECTOR,
    enabled: isOpen,
    gap: GAP,
  });

  // Временно: пока нет стора уведомлений, берём из моков
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const listRef = useRef<HTMLDivElement>(null);
  const scrollEdges = useScrollEdges(listRef);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

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
      <div className="flex items-center justify-between gap-4 pr-10">
        <h3 className="text-[#1D1D1F] font-bold text-2xl md:text-3xl">
          Уведомления
        </h3>
        {me && unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-[#FF6633] text-sm font-medium transition-opacity hover:opacity-80"
          >
            Прочитать все
          </button>
        )}
      </div>

      {!me ? (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <h3 className="text-[#1D1D1F] font-bold text-xl">
            Вы не авторизованы
          </h3>
          <p className="text-[#6E6E73] mt-2">
            Войдите, чтобы видеть уведомления о заказах и акциях
          </p>
          <button
            type="button"
            onClick={authModal.open}
            className="mt-6 w-full max-w-xs text-white font-semibold bg-[#00CC2D] py-4 rounded-xl transition-opacity hover:opacity-90"
          >
            Авторизоваться
          </button>
        </div>
      ) : (
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
            {notifications.length === 0 && (
              <p className="text-[#87878C] font-medium py-8 text-center">
                Уведомлений пока нет
              </p>
            )}
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onClick={() => markAsRead(notification.id)}
              />
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};
