import banner1 from "@/shared/assets/banner1.webp";
import banner2 from "@/shared/assets/banner2.webp";
import banner3 from "@/shared/assets/banner3.webp";
import { BannerSlider, type Banner } from "@/widgets/banner-slider";
import { CategoryList } from "@/widgets/category-list";
import { ProductSection } from "@/widgets/product-section";
import { getProductsByCategory } from "@/entities/product";

const banners: Banner[] = [
  {
    key: "sushi",
    image: banner1,
    badge: "Новинка",
    title: "Нигири-сет «Ассорти»",
    text: "Лосось, тунец, угорь и креветка на тёплом рисе",
    href: "/",
  },
  {
    key: "big-set",
    image: banner2,
    badge: "−20%",
    title: "Большой сет на компанию",
    text: "60 штук — роллы, суши и гунканы для всех",
    href: "/",
  },
  {
    key: "hot-rolls",
    image: banner3,
    badge: "Хит",
    title: "Запечённые роллы",
    text: "Тёплые роллы с соусом унаги и кунжутом",
    href: "/",
  },
];

export function HomePage() {
  return (
    <section className="flex flex-col gap-6 md:gap-8">
      <BannerSlider banners={banners} />
      <CategoryList />

      <ProductSection
        href="/products/sushi"
        title="Суши"
        products={getProductsByCategory("sushi")}
      />
      <ProductSection
        href="/products/rolls"
        title="Роллы"
        products={getProductsByCategory("rolls")}
      />
      <ProductSection
        href="/products/sets"
        title="Сеты"
        products={getProductsByCategory("sets")}
      />
      <ProductSection
        href="/products/drinks"
        title="Напитки"
        products={getProductsByCategory("drinks")}
      />
    </section>
  );
}
