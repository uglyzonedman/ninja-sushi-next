import type { StaticImageData } from "next/image";
import roll from "@/shared/assets/roll.svg";
import sushi from "@/shared/assets/sushi.svg";
import sets from "@/shared/assets/sets.svg";
import boul from "@/shared/assets/boul.svg";
import drinks from "@/shared/assets/drinks.svg";
import souce from "@/shared/assets/souce.svg";

export type Category = {
  key: string;
  label: string;
  icon: StaticImageData;
};

export const categories: Category[] = [
  { key: "rolls", label: "Роллы", icon: roll },
  { key: "sushi", label: "Суши", icon: sushi },
  { key: "sets", label: "Сеты", icon: sets },
  { key: "bowls", label: "Боулы", icon: boul },
  { key: "drinks", label: "Напитки", icon: drinks },
  { key: "sauces", label: "Соусы", icon: souce },
];
