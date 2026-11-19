"use client";
import Image from "next/image";

import googleIcon from "@/shared/assets/icons/google.svg";
import telegramIcon from "@/shared/assets/icons/telegram.svg";
import { useModal } from "@/shared/model";
import { Modal } from "@/shared/ui";
import { useState } from "react";

import { CodeInput } from "./code-input";

type AuthStep = "auth" | "verify_code";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_LENGTH = 4;

export const AuthModal = () => {
  const { isOpen, close } = useModal("auth");

  const [typeAuth, setTypeAuth] = useState<AuthStep>("auth");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleClose = () => {
    close();
    setTypeAuth("auth");
    setCode("");
  };

  const isEmailValid = EMAIL_REGEX.test(email.trim());

  const handleSendCode = () => {
    if (!isEmailValid) return;
    setTypeAuth("verify_code");
  };

  const isCodeComplete = new RegExp(`^\\d{${CODE_LENGTH}}$`).test(code);

  const handleVerify = () => {
    if (!isCodeComplete) return;
    console.log({ email: email.trim(), code });
  };

  return (
    <Modal open={isOpen} onClose={handleClose} className="w-[520px]">
      {typeAuth === "auth" ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 pr-10">
            <h3 className="text-[#1A1A1A] font-bold text-3xl">Авторизация</h3>
            <p className="text-[#6E6E73] font-medium text-base">
              Введите ваш email:
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#87878C] text-sm">Email</p>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
              className="h-12 w-full min-w-0 bg-[#F5F5F7] rounded-xl px-4 text-[#1D1D1F] font-medium outline-none ring-primary transition-shadow placeholder:text-[#87878C] focus:ring-2"
            />
            <button
              onClick={handleSendCode}
              disabled={!isEmailValid}
              className="bg-[#00CC2D] text-white font-medium text-base py-3 rounded-xl mt-3 disabled:opacity-50"
            >
              Войти по email
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
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 pr-10">
            <h3 className="text-center text-[#1A1A1A] font-bold text-3xl">
              Подтверждение
            </h3>
            <p className="text-[#6E6E73] text-center font-medium">
              Введите 4-х значный код, отправленный на email
            </p>
            <p className="text-[#1D1D1F] font-medium text-base text-center">
              {email.trim()}
            </p>
            <button
              onClick={() => {
                setTypeAuth("auth");
                setCode("");
              }}
              className="font-medium text-sm text-[#00CC2D]"
            >
              Изменить email
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#87878C] text-sm">Код из письма</p>
            <CodeInput length={CODE_LENGTH} value={code} onChange={setCode} />
            <button
              onClick={handleVerify}
              disabled={!isCodeComplete}
              className="bg-[#00CC2D] text-white font-medium text-base rounded-xl py-4  mt-3 disabled:opacity-50"
            >
              Подтвердить
            </button>
            <button className="text-[#00CC2D] font-medium text-base bg-[#F5F5F7] rounded-xl py-4">
              Получить код повторно
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
