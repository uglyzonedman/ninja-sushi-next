export const siteConfig = {
  name: "Ninja Sushi",
  description: "Доставка суши и роллов",
  phone: "+7 (999) 123-45-67",
  copyrightYear: 2026,
  orderPhone: "+38 (067) 436 61 27",
  workingHours: ["с 11:00 до 22:45", "с 22:45 до 06:00"],
  socials: {
    instagram: "#", // TODO: ссылка на Instagram
    telegram: "#", // TODO: ссылка на Telegram
  },
  apps: {
    appStore: "#", // TODO: ссылка на приложение в App Store
    googlePlay: "#", // TODO: ссылка на приложение в Google Play
  },
  nav: [
    { href: "/", label: "Главная" },
    { href: "/delivery", label: "Доставка" },
    { href: "/about-us", label: "О нас" },
    { href: "/news", label: "Новости" },
  ],
} as const;
