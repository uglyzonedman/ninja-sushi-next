"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type Banner = {
  key: string;
  image: StaticImageData;
  badge: string;
  title: string;
  text: string;
  href: string;
};

const arrowButton =
  "flex size-12 items-center justify-center rounded-full border-2 border-[#D2D2D7] bg-white text-[#686870] transition-colors hover:border-primary hover:text-primary active:bg-primary active:border-primary active:text-white";

export function BannerSlider({ banners }: { banners: Banner[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="flex flex-col gap-4 md:gap-6 max-w-main w-full mx-auto">
      <div className="relative">
        <div
          className="overflow-hidden rounded-2xl md:rounded-3xl"
          ref={emblaRef}
        >
          <div className="flex">
            {banners.map((banner, index) => (
              <div key={banner.key} className="min-w-0 flex-[0_0_100%]">
                <div className="grid h-full overflow-hidden rounded-2xl md:rounded-3xl bg-white md:grid-cols-2">
                  <div className="flex flex-col items-start justify-center gap-3 p-5 pb-12 sm:gap-5 sm:p-8 sm:pb-16 md:p-12 md:pb-20">
                    <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                      {banner.badge}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-bold leading-tight tracking-tight text-[#1D1D1F] lg:text-5xl">
                      {banner.title}
                    </h2>
                    <p className="max-w-md text-base md:text-lg text-[#686870]">
                      {banner.text}
                    </p>
                    <Link
                      href={banner.href}
                      className="mt-1 sm:mt-2 flex items-center gap-2 rounded-xl bg-primary px-5 py-3 md:px-6 md:py-4 text-base font-semibold text-white transition-colors hover:bg-[#E5532A] active:bg-[#CC4A24]"
                    >
                      Заказать
                      <ArrowRight className="size-5" />
                    </Link>
                  </div>

                  <div className="relative order-first min-h-[200px] sm:min-h-[280px] md:order-none md:min-h-[460px]">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full  px-3 py-2  md:bottom-6">
          {banners.map((banner, index) => (
            <button
              key={banner.key}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Слайд ${index + 1}`}
              aria-current={index === selectedIndex}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-[#D2D2D7] hover:bg-[#9E9E9E]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
