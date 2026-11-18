// Форматируем только число: символ валюты из Intl отличается
// между Node и браузерами («KZT» vs «₸») → ошибка гидрации
const numberFormatter = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 0,
});

/** 12500 → «12 500 ₸» */
export const formatPrice = (value: number) =>
  `${numberFormatter.format(value)} ₸`;
