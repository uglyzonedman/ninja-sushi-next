export type Notification = {
  id: string;
  text: string;
  /** ISO-дата создания */
  createdAt: string;
  isRead: boolean;
};
