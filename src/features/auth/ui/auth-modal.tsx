"use client";
import { Modal } from "@/shared/ui";

export const AuthModal = () => {
  return (
    <Modal
      open={true}
      onClose={() => console.log("test")}
      className="w-[520px]"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 pr-10">
          <h3 className="text-[#1A1A1A] font-bold text-3xl">Авторизация</h3>
          <p className="text-[#6E6E73] font-medium text-base">
            Введите ваш номер телефона:
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[#87878C] text-sm">Имя</p>
          <div className="flex items-center gap-2">
            <div className="flex h-12 shrink-0 items-center gap-2 bg-[#F5F5F7] rounded-xl px-4">
              {/* флаг кз */}
              <span className="text-[#1D1D1F] font-medium">+7</span>
            </div>
            <input
              className="h-12 w-full min-w-0 bg-[#F5F5F7] rounded-xl px-4 text-[#1D1D1F] font-medium outline-none ring-primary transition-shadow placeholder:text-[#87878C] focus:ring-2"
              type="text"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
