"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  Heart,
  LogIn,
  Menu,
  Phone,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";

import logo from "@/shared/assets/logo.svg";
import kzFlag from "@/shared/assets/flags/kz.svg";
import cities from "@/shared/config/cities";
import { languages } from "@/shared/config/languages";
import { SITE_HEADER_ATTR, siteConfig } from "@/shared/config";
import { useAuthStore, useModal } from "@/shared/model";
import { useMe } from "@/entities/user";

const PHONE = "+38 097 699 34 38";
const PHONE_HREF = "tel:+380976993438";

const textLink =
  "text-[#1D1D1F] text-base font-medium transition-colors hover:text-primary active:text-primary";

const iconButton =
  "rounded-xl border-2 border-[#D2D2D7] text-[#686870] transition-colors hover:border-primary hover:text-primary active:bg-primary active:border-primary active:text-white";

/** Квадратная кнопка-иконка: поменьше на телефоне */
const squareButton = `p-2.5 md:p-4 ${iconButton}`;

const primaryButton =
  "flex items-center gap-3 rounded-xl border-2 border-primary bg-primary text-white shadow-[0_8px_20px_-8px_rgba(255,102,51,0.6)] transition-all hover:bg-[#ff7a4d] hover:border-[#ff7a4d] hover:shadow-[0_10px_24px_-8px_rgba(255,102,51,0.75)] active:scale-[0.97] active:bg-[#e65a2b] active:border-[#e65a2b]";

export function Header() {
  const pathname = usePathname();
  const { push } = useRouter();
  const { data: me } = useMe();
  const hasAccessToken = useAuthStore((s) => !!s.accessToken);
  const isAuthorized = hasAccessToken && !!me;

  const [currentCity] = useState(1);
  const [currentLang] = useState("RU");
  const cartModal = useModal("cart-modal");
  const authModal = useModal("auth");
  const notificationModal = useModal("notification-modal");
  const mobileMenu = useModal("mobile-menu");

  const cityLabel = cities.find((item) => item.id == currentCity);
  const languageLabel = languages.find(
    (item) => item.toUpperCase() == currentLang.toUpperCase(),
  );

  const closeMenu = mobileMenu.close;

  // Esc закрывает меню
  useEffect(() => {
    if (!mobileMenu.isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileMenu.isOpen]);

  const cityButton = (
    <button className={`flex items-center gap-2 ${textLink}`}>
      <Image src={kzFlag} alt="Казахстан" width={24} height={16} />
      <p>{cityLabel?.name_ru}</p>
    </button>
  );

  const langButton = (
    <button className={textLink}>
      <p>{languageLabel?.toUpperCase()}</p>
    </button>
  );

  return (
    <header
      {...{ [SITE_HEADER_ATTR]: true }}
      className="sticky top-2 md:top-0 z-50 bg-white w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] max-w-main mx-auto px-3 md:px-6 py-2 md:py-3 mt-2 md:mt-4 rounded-2xl"
    >
      <div className="flex items-center justify-between gap-3 md:gap-6 2xl:gap-8">
        <div className="flex items-center gap-2">
          {/* Бургер — пока навигация не помещается */}
          <button
            onClick={mobileMenu.toggle}
            aria-label={mobileMenu.isOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileMenu.isOpen}
            className={`xl:hidden ${squareButton}`}
          >
            {mobileMenu.isOpen ? <X /> : <Menu />}
          </button>

          <Link href="/" className="shrink-0">
            <Image
              src={logo}
              alt="Ninja Sushi"
              priority
              className="h-8 w-auto md:h-10 2xl:h-12"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {cityButton}
          {langButton}
        </div>

        <nav className="hidden xl:block">
          <ul className="flex items-center gap-6">
            {siteConfig.nav.map((nav) => {
              const isActive = pathname === nav.href;
              return (
                <li key={nav.href}>
                  <Link
                    href={nav.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`${textLink} ${isActive ? "text-primary" : ""}`}
                  >
                    {nav.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={PHONE_HREF}
          className={`hidden 2xl:flex items-center gap-3 ${textLink}`}
        >
          <Phone className="text-primary" />
          <p>{PHONE}</p>
        </a>

        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={notificationModal.open}
            aria-label="Уведомления"
            className={squareButton}
          >
            <Bell />
          </button>
          <button
            aria-label="Избранное"
            className={`hidden sm:block ${squareButton}`}
          >
            <Heart />
          </button>

          {isAuthorized ? (
            <button
              onClick={() => push("/profile")}
              aria-label="Профиль"
              className={squareButton}
            >
              <UserRound />
            </button>
          ) : (
            <button
              onClick={authModal.open}
              aria-label="Войти"
              className={`p-2.5 md:py-4 md:px-5 ${primaryButton}`}
            >
              <p className="hidden md:block text-base font-medium">Войти</p>
              <LogIn />
            </button>
          )}

          <button
            onClick={cartModal.open}
            aria-label="Корзина"
            className={`p-2.5 md:py-4 md:px-5 flex items-center gap-3 ${iconButton}`}
          >
            <p className="hidden md:block text-base font-medium">Корзина</p>
            <ShoppingBag />
          </button>
        </div>
      </div>

      {/* Выпадающее меню для экранов уже xl */}
      {mobileMenu.isOpen && (
        <div className="xl:hidden absolute left-0 right-0 top-full mt-2 rounded-2xl bg-white p-4 md:p-6 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.25)]">
          <nav>
            <ul className="flex flex-col">
              {siteConfig.nav.map((nav) => {
                const isActive = pathname === nav.href;
                return (
                  <li key={nav.href}>
                    <Link
                      href={nav.href}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-xl px-3 py-3 text-lg font-medium transition-colors hover:bg-[#F5F5F7] ${
                        isActive ? "text-primary" : "text-[#1D1D1F]"
                      }`}
                    >
                      {nav.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="my-3 h-px bg-[#E8E8ED]" />

          <div className="flex flex-col gap-4 px-3">
            <a
              href={PHONE_HREF}
              className={`flex items-center gap-3 ${textLink}`}
            >
              <Phone className="text-primary" />
              <p>{PHONE}</p>
            </a>

            <div className="flex md:hidden items-center gap-4">
              {cityButton}
              {langButton}
            </div>

            <button className={`sm:hidden flex items-center gap-3 ${textLink}`}>
              <Heart className="text-[#686870]" />
              <p>Избранное</p>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
