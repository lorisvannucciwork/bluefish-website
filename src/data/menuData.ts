import { MenuCategory, MenuItem } from "@/types";

export const menuCategories: MenuCategory[] = [
  { id: "antipasti", name: "Antipasti" },
  { id: "primi", name: "Primi" },
  { id: "secondi", name: "Secondi" },
  { id: "sushi", name: "Sushi Selection" },
  { id: "cocktails", name: "Drinks & Cocktails" },
];

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export const menuSectionsData: MenuSection[] = [
  {
    id: "antipasti",
    title: "ANTIPASTI",
    items: [
      {
        name: "Plate Name",
        category: "antipasti",
        price: "16€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
        tag: "Fresh Catch",
      },
      {
        name: "Plate Name",
        category: "antipasti",
        price: "15€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
      },
      {
        name: "Plate Name",
        category: "antipasti",
        price: "14€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
      },
      {
        name: "Plate Name",
        category: "antipasti",
        price: "17€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
        tag: "Popular",
      },
      {
        name: "Plate Name",
        category: "antipasti",
        price: "15€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
      },
    ],
  },
  {
    id: "primi",
    title: "PRIMI",
    items: [
      {
        name: "Plate Name",
        category: "primi",
        price: "18€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
        tag: "Chef's Signature",
      },
      {
        name: "Plate Name",
        category: "primi",
        price: "17€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
      },
      {
        name: "Plate Name",
        category: "primi",
        price: "16€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
      },
      {
        name: "Plate Name",
        category: "primi",
        price: "16€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
      },
    ],
  },
  {
    id: "secondi",
    title: "SECONDI",
    items: [
      {
        name: "Plate Name",
        category: "secondi",
        price: "22€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
      },
      {
        name: "Plate Name",
        category: "secondi",
        price: "24€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
        tag: "Signature",
      },
      {
        name: "Plate Name",
        category: "secondi",
        price: "26€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
        tag: "Grand Catch",
      },
      {
        name: "Plate Name",
        category: "secondi",
        price: "22€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
      },
    ],
  },
  {
    id: "sushi",
    title: "SUSHI SELECTION",
    items: [
      {
        name: "Plate Name",
        category: "sushi",
        price: "26€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
        tag: "Chef Selection",
      },
      {
        name: "Plate Name",
        category: "sushi",
        price: "22€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
      },
      {
        name: "Plate Name",
        category: "sushi",
        price: "18€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
        tag: "Special",
      },
      {
        name: "Plate Name",
        category: "sushi",
        price: "16€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
        tag: "House Signature",
      },
    ],
  },
  {
    id: "cocktails",
    title: "COCKTAILS & SIGNATURE SIPS",
    items: [
      {
        name: "Plate Name",
        category: "cocktails",
        price: "12€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
        tag: "Signature Sip",
      },
      {
        name: "Plate Name",
        category: "cocktails",
        price: "10€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
      },
      {
        name: "Plate Name",
        category: "cocktails",
        price: "11€",
        desc: "Plate Description",
        image: "/images/elements/plate.webp",
      },
    ],
  },
];

export const menuItemsData: MenuItem[] = menuSectionsData.flatMap(
  (section) => section.items
);
