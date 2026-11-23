import type { Notification } from "../model/types";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    text: "Ваш заказ №1024 передан курьеру и скоро будет у вас",
    createdAt: "2026-02-16T16:40:00",
    isRead: false,
  },
  {
    id: "2",
    text: "Скидка 20% на все сеты до конца недели — успейте заказать",
    createdAt: "2026-02-15T12:10:00",
    isRead: false,
  },
  {
    id: "3",
    text: "Итальянская полиция обнаружила картину Тициана, исчезнувшую в 2004 году",
    createdAt: "2026-02-14T09:25:00",
    isRead: true,
  },
  {
    id: "4",
    text: "Новинка в меню: ролл «Филадельфия лайт» с огурцом и авокадо",
    createdAt: "2026-02-12T18:05:00",
    isRead: true,
  },
  {
    id: "5",
    text: "Спасибо за заказ! Оцените, пожалуйста, качество доставки",
    createdAt: "2026-02-10T20:30:00",
    isRead: true,
  },
  {
    id: "6",
    text: "Бесплатная доставка при заказе от 5 000 ₸ действует весь февраль",
    createdAt: "2026-02-08T11:00:00",
    isRead: true,
  },
];
