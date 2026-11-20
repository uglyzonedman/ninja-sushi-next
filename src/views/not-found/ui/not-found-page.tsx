import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import sushi from "@/shared/assets/sushi.svg";
import { CategoryList } from "@/widgets/category-list";

export function NotFoundPage() {
  return (
    <section className="flex flex-col gap-6 md:gap-8">
      <div className="max-w-main w-full mx-auto bg-white rounded-2xl px-4 py-10 md:px-6 md:py-16 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 sm:gap-4 text-primary font-bold text-[96px] sm:text-[160px] leading-none tabular-nums select-none">
          <span>4</span>
          <span className="flex items-center justify-center size-20 sm:size-32 rounded-full bg-[#F5F5F7]">
            <Image
              src={sushi}
              alt=""
              aria-hidden
              className="size-12 sm:size-20"
            />
          </span>
          <span>4</span>
        </div>

        <h1 className="text-[#1D1D1F] font-bold text-2xl md:text-3xl mt-6 md:mt-8">
          Страница не найдена
        </h1>
        <p className="text-[#87878C] font-medium mt-3 max-w-md">
          Похоже, этот ролл уже съели. Проверьте адрес или выберите что-нибудь
          вкусное в меню
        </p>

        <Link
          href="/"
          className="group mt-8 flex items-center gap-2 text-white font-medium bg-primary rounded-xl py-4 px-6 transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
          На главную
        </Link>
      </div>

      <CategoryList />
    </section>
  );
}
