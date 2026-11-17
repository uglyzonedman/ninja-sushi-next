"use client";
import Image from "next/image";

import kzFlag from "@/shared/assets/flags/kz.svg";
import googleIcon from "@/shared/assets/icons/google.svg";
import telegramIcon from "@/shared/assets/icons/telegram.svg";
import { useModal } from "@/shared/model";
import { Modal } from "@/shared/ui";
import { IMaskInput } from "react-imask";

export const AuthModal = () => {
  const { isOpen, close } = useModal("auth");

  return (
    <Modal open={isOpen} onClose={close} className="w-[520px]">
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
              <Image src={kzFlag} alt="Казахстан" width={24} height={16} />
              <span className="text-[#1D1D1F] font-medium">+7</span>
            </div>
            <IMaskInput
              mask="(000) 000-00-00"
              placeholder="(700) 123-45-67"
              type="tel"
              inputMode="numeric"
              onAccept={(value) => console.log(value)}
              className="h-12 w-full min-w-0 bg-[#F5F5F7] rounded-xl px-4 text-[#1D1D1F] font-medium outline-none ring-primary transition-shadow placeholder:text-[#87878C] focus:ring-2"
            />
          </div>
          <button className="bg-[#00CC2D] text-white font-medium text-base py-3 rounded-xl mt-3">
            Войти по номеру телефона
          </button>

          <span className="text-[#9E9E9E] font-medium text-center">Или</span>

          <div className="flex items-center gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 bg-[#F5F5F7] rounded-xl py-3 text-[#1D1D1F] font-medium">
              <Image src={googleIcon} alt="" width={24} height={24} />
              <span>Google</span>
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 bg-[#F5F5F7] rounded-xl py-3 text-[#1D1D1F] font-medium">
              <Image src={telegramIcon} alt="" width={24} height={24} />
              <span>Telegram</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
