"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, Heart, Phone, ShoppingBag, UserRound } from "lucide-react";

import logo from "@/shared/assets/logo.svg";
import kzFlag from "@/shared/assets/flags/kz.svg";
import cities from "@/shared/config/cities";
import { languages } from "@/shared/config/languages";
import { SITE_HEADER_ATTR, siteConfig } from "@/shared/config";
import { useModal } from "@/shared/model";

const textLink =
  "text-[#1D1D1F] text-base font-medium transition-colors hover:text-primary active:text-primary";

const iconButton =
  "rounded-xl border-2 border-[#D2D2D7] text-[#686870] transition-colors hover:border-primary hover:text-primary active:bg-primary active:border-primary active:text-white";

export function Header() {
  const pathname = usePathname();
  const [currentCity, setCurrentCity] = useState(1);
  const [currentLang, setCurrentLang] = useState("RU");
  const cartModal = useModal("cart-modal");
  const authModal = useModal("auth");

  const cityLabel = cities.find((item) => item.id == currentCity);

  const languageLabel = languages.find(
    (item) => item.toUpperCase() == currentLang.toUpperCase(),
  );

  return (
    <header
      {...{ [SITE_HEADER_ATTR]: true }}
      className={`sticky top-0 ${cartModal.isOpen ? "z-50" : "z-10"} bg-white w-full max-w-main mx-auto px-6 py-3 mt-4 rounded-2xl`}
    >
      <div className="flex items-center justify-between gap-8">
        <Image src={logo} alt="logo" />

        <div className="flex items-center gap-4">
          <button className={`flex items-center gap-2 ${textLink}`}>
            <Image src={kzFlag} alt="Казахстан" width={24} height={16} />
            <p>{cityLabel?.name_ru}</p>
          </button>
          <button className={textLink}>
            <p>{languageLabel?.toUpperCase()}</p>
          </button>
        </div>

        <nav>
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
          href="tel:+380976993438"
          className={`flex items-center gap-3 ${textLink}`}
        >
          <Phone className="text-primary" />
          <p>+38 097 699 34 38</p>
        </a>

        <div className="flex items-center gap-2">
          <button className={`p-4 ${iconButton}`}>
            <Bell />
          </button>
          <button className={`p-4 ${iconButton}`}>
            <Heart />
          </button>
          <button onClick={authModal.open} className={`p-4 ${iconButton}`}>
            <UserRound />
          </button>
          <button
            className={`py-4 px-5 flex items-center gap-3 ${iconButton}`}
            onClick={cartModal.open}
          >
            <p className="text-base font-medium">Корзина</p>
            <ShoppingBag />
          </button>
        </div>
      </div>
    </header>
  );
}
