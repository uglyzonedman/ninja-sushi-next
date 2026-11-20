import Image from "next/image";
import Link from "next/link";
import logo from "@/shared/assets/logo.svg";
import { siteConfig } from "@/shared/config";
import { InstagramIcon, StoreButton, TelegramIcon } from "@/shared/ui";

const title = "text-[#9E9E9E] text-sm font-medium mb-4";
const item = "text-[#1D1D1F] text-base font-medium";
const link = `${item} transition-colors hover:text-primary active:text-primary`;
const socialButton =
  "flex items-center justify-center rounded-xl border-2 border-[#D2D2D7] p-3 text-[#686870] transition-colors hover:border-primary hover:text-primary active:bg-primary active:border-primary active:text-white";

export function Footer() {
  return (
    <footer className="mt-auto w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] max-w-main mx-auto mb-2 md:mb-4 rounded-2xl bg-white px-4 py-8 md:px-6 md:py-10">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:flex md:flex-wrap md:justify-between md:gap-10">
        <div className="col-span-2 flex flex-col gap-6">
          <Image
            src={logo}
            alt="Ninja Sushi"
            className="h-10 w-auto md:h-12 self-start"
          />
          <div className="flex flex-wrap items-center gap-3">
            <StoreButton store="app-store" href={siteConfig.apps.appStore} />
            <StoreButton
              store="google-play"
              href={siteConfig.apps.googlePlay}
            />
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <p className="text-[#9E9E9E] text-sm font-medium">
              © {siteConfig.name}. All rights reserved.
            </p>
            <Link
              className="text-[#1D1D1F] text-sm font-medium transition-colors hover:text-primary"
              href="/politics"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>

        <div>
          <p className={title}>Навигация:</p>
          <ul className="flex flex-col gap-3">
            {siteConfig.nav.map((nav) => (
              <li key={nav.href}>
                <Link href={nav.href} className={link}>
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={title}>Оформить заказ:</p>
          <a
            href={`tel:${siteConfig.orderPhone.replace(/[^\d+]/g, "")}`}
            className={link}
          >
            {siteConfig.orderPhone}
          </a>
        </div>

        <div>
          <p className={title}>Время работы:</p>
          <ul className="flex flex-col gap-3">
            {siteConfig.workingHours.map((hours) => (
              <li key={hours} className={item}>
                {hours}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={title}>Мы в соц. сетях:</p>
          <ul className="flex items-center gap-2">
            <li>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={socialButton}
              >
                <InstagramIcon className="size-6" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className={socialButton}
              >
                <TelegramIcon className="size-6" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
