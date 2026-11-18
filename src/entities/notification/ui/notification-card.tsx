import type { Notification } from "../model/types";

type NotificationCardProps = {
  notification: Notification;
  onClick?: () => void;
};

const pad = (value: number) => String(value).padStart(2, "0");

/** 16.02 в 16:40 */
const formatNotificationDate = (iso: string) => {
  const date = new Date(iso);
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)} в ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const NotificationCard = ({
  notification: { text, createdAt, isRead },
  onClick,
}: NotificationCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-start gap-3 bg-[#F5F5F7] rounded-xl p-4 text-left w-full transition-colors hover:bg-[#EDEDF0]"
    >
      <div className="min-w-0 flex-1">
        <p
          className={`text-[#1D1D1F] ${isRead ? "font-medium" : "font-bold"}`}
        >
          {text}
        </p>
        <time
          dateTime={createdAt}
          className="text-[#87878C] text-sm font-medium mt-1 block"
        >
          {formatNotificationDate(createdAt)}
        </time>
      </div>
      {!isRead && (
        <span
          aria-label="Новое уведомление"
          className="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#FF6633]"
        />
      )}
    </button>
  );
};
