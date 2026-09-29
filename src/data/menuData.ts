import { MenuCategory, MenuItem, MenuSection } from "@/types";

export type { MenuSection };

export const POLICY_NOTE =
  "Prices include all taxes; all prices are subject to a 12% service charge.";

export const menuCategories: MenuCategory[] = [
  { id: "starters-bowls", name: "Appetizers, Soups & Bowls" },
  { id: "sushi-classics", name: "Nigiri, Sashimi & Ura Maki" },
  { id: "rolls-combos", name: "Rolls, Temaki & Combos" },
  { id: "mains-desserts", name: "Main Course, Pasta & Dessert" },
  { id: "beverages-wine", name: "Beverages & Wine" },
  { id: "cocktails-shoots", name: "Cocktails, Mocktails & Shoots" },
];

export const menuSectionsData: MenuSection[] = [
  {
    id: "appetizers",
    categoryId: "starters-bowls",
    title: "Appetizers",
    items: [
      {
        name: "Edamame",
        category: "starters-bowls",
        price: "€5.00",
        desc: "Sea salt",
        image: "/images/menu/edamame4.jpg",
      },
      {
        name: "Edamame",
        category: "starters-bowls",
        price: "€5.00",
        desc: "sweet sherry sauce",
        image: "/images/menu/edamame-sweet-sherry.JPEG",
      },
      {
        name: "Crackers",
        category: "starters-bowls",
        price: "€2.00",
        desc: "With teriyaki sauce",
        image: "/images/menu/Crackers.png",
      },
      {
        name: "Panko (Tuna or Shrimp or Salmon)",
        category: "starters-bowls",
        price: "€8.00",
        desc: "Green onion & spicy/ouzo sauce",
        image: "/images/menu/panko-salmon.png",
      },
      {
        name: "Tempura Shrimps",
        category: "starters-bowls",
        price: "€8.50",
        desc: "& sweet sherry sauce",
      },
      {
        name: "Fried Calamari",
        category: "starters-bowls",
        price: "€6.00",
        desc: "& tartare sauce",
      },
      {
        name: "Fried Shrimps Panko",
        category: "starters-bowls",
        price: "€9.00",
        desc: "& mango/kiwi/strawberry sauce or classic mayo",
      },
      {
        name: "French Fries",
        category: "starters-bowls",
        price: "€3.00",
        desc: "With ketchup & mayo",
      },
    ],
  },
  {
    id: "soups",
    categoryId: "starters-bowls",
    title: "Soups",
    items: [
      {
        name: "Miso",
        category: "starters-bowls",
        price: "€5.00",
        desc: "Broth/dashi, wakame, green onion & tofu cheese",
      },
      {
        name: "Tom Yum",
        category: "starters-bowls",
        price: "€9.00",
        desc: "Broth/dashi, garlic, ginger, shrimps & Japan spicy",
      },
      {
        name: "Mix Seafood",
        category: "starters-bowls",
        price: "€15.00",
        desc: "Shrimps, calamari, mussels, cheddar cheese, garlic & ginger",
        image: "/images/menu/mix-seafood.png",
      },
      {
        name: "Coconut Milk",
        category: "starters-bowls",
        price: "€12.00",
        desc: "Calamari & crabs",
      },
    ],
  },
  {
    id: "salads",
    categoryId: "starters-bowls",
    title: "Salads",
    items: [
      {
        name: "Crab Salad",
        category: "starters-bowls",
        price: "€8.00",
        desc: "Shrimps, avocado, cucumber, caviar & spicy/classic mayo",
        image: "/images/menu/crab-salad.JPEG",

      },
      {
        name: "Ceviche",
        category: "starters-bowls",
        price: "€10.00",
        desc: "Tuna or salmon, red onion, coriander, cucumber, avocado, cherry tomatoes & hot pepper",
        image: "/images/menu/ceviche.JPEG",

      },
      {
        name: "Taco",
        category: "starters-bowls",
        price: "€6.00",
        desc: "Octopus, avocado, coriander, cherry tomatoes & balsamic vinegar",
        image: "/images/menu/taco.JPEG",
      },
      {
        name: "Seaweed & Sesame Mix",
        category: "starters-bowls",
        price: "€6.00",
        desc: "Fresh seaweed salad tossed with toasted sesame mix",
        image: "/images/menu/sea-weed.JPEG",
      },
    ],
  },
  {
    id: "noodles",
    categoryId: "starters-bowls",
    title: "Noodles",
    items: [
      {
        name: "Shrimp Noodles",
        category: "starters-bowls",
        price: "€12.00",
        desc: "Bell peppers, carrots, white onion",
        image: "/images/menu/shrimp-noodles.JPEG",
      },
      {
        name: "Vegetables Noodles",
        category: "starters-bowls",
        price: "€8.00",
        desc: "Bell peppers, carrots & white onion",
        image: "/images/menu/vegetables-noodles.JPEG",
      },
      {
        name: "Ramen",
        category: "starters-bowls",
        price: "€10.00",
        desc: "Shrimps, garlic, ginger, mushrooms and cream",
        image: "/images/menu/ramen.JPEG",
      },
    ],
  },
  {
    id: "poke-bowl",
    categoryId: "starters-bowls",
    title: "Poke Bowl — €18.00",
    items: [
      {
        name: "Poke Bowl",
        category: "starters-bowls",
        price: "€18.00",
        desc: "Base Protein: Salmon / Tuna / Shrimp • Choose your 4 sides: Pineapple, sweet corn, avocado, edamame, seaweed salad, fried onions, green onion",
      },
    ],
  },

  {
    id: "nigiri",
    categoryId: "sushi-classics",
    title: "Nigiri (1 piece) — €1.50",
    items: [
      { name: "Salmon", category: "sushi-classics", price: "€1.50" },
      { name: "Tuna", category: "sushi-classics", price: "€1.50" },
      { name: "Shrimp boiled", category: "sushi-classics", price: "€1.50" },
      { name: "Crab", category: "sushi-classics", price: "€1.50" },
      { name: "Calamari & caviar", category: "sushi-classics", price: "€1.50" },
      { name: "Octopus", category: "sushi-classics", price: "€1.50" },
      { name: "Seabass", category: "sushi-classics", price: "€1.50" },
      { name: "Eel teriyaki & sesame", category: "sushi-classics", price: "€1.50" },
      { name: "Caviar rice & nori", category: "sushi-classics", price: "€1.50" },
      { name: "Shrimp tempura & teriyaki", category: "sushi-classics", price: "€1.50" },
    ],
  },
  {
    id: "ura-maki",
    categoryId: "sushi-classics",
    title: "Ura Maki (4 pieces) — €8.00",
    items: [
      {
        name: "Salmon",
        category: "sushi-classics",
        price: "€8.00",
        desc: "Rice, nori & sesame mix",
      },
      {
        name: "Tuna",
        category: "sushi-classics",
        price: "€8.00",
        desc: "Rice, nori & sesame mix",
      },
      {
        name: "Shrimp Tempura",
        category: "sushi-classics",
        price: "€8.00",
        desc: "Rice, nori & sesame mix",
      },
      {
        name: "California",
        category: "sushi-classics",
        price: "€8.00",
        desc: "Crab, rice, nori, avocado, cucumber & sesame mix",
      },
    ],
  },
  {
    id: "sashimi",
    categoryId: "sushi-classics",
    title: "Sashimi (4 pieces) — €12.00",
    items: [
      { name: "Salmon", category: "sushi-classics", price: "€12.00" },
      { name: "Tuna", category: "sushi-classics", price: "€12.00" },
      { name: "Fried Calamari & caviar", category: "sushi-classics", price: "€12.00" },
      { name: "Octopus", category: "sushi-classics", price: "€12.00" },
      { name: "Seabass", category: "sushi-classics", price: "€12.00" },
      {
        name: "Fried Salmon",
        category: "sushi-classics",
        price: "€12.00",
        desc: "With teriyaki sauce or spicy/lemon mayo",
      },
    ],
  },
  {
    id: "nigiri-special",
    categoryId: "sushi-classics",
    title: "Nigiri Special (1 piece) — €2.50",
    items: [
      {
        name: "Crispy Cheddar Tuna",
        category: "sushi-classics",
        price: "€2.50",
        desc: "Crispy rice, tuna, cheddar cheese, caviar & sesame mix",
      },
      {
        name: "Crispy Cheddar Salmon",
        category: "sushi-classics",
        price: "€2.50",
        desc: "Crispy rice, salmon, cheddar cheese, caviar & sesame mix",
      },
      {
        name: "Salmon Tataki",
        category: "sushi-classics",
        price: "€2.50",
        desc: "Salmon tataki, black pepper, garlic, yuzu sauce & green onion",
      },
      {
        name: "Crispy Mix",
        category: "sushi-classics",
        price: "€2.50",
        desc: "Crispy rice, salmon, shrimp tempura, green onion & sesame sauce",
      },
      {
        name: "Tuna Tataki",
        category: "sushi-classics",
        price: "€2.50",
        desc: "Tuna tataki, crispy rice, black pepper, garlic, yuzu sauce & green onion",
      },
      {
        name: "Spicy Tuna",
        category: "sushi-classics",
        price: "€2.50",
        desc: "Tuna, rice, sriracha sauce & spicy pepper",
      },
      {
        name: "Crispy Shrimp Avocado",
        category: "sushi-classics",
        price: "€2.50",
        desc: "Crispy rice, boiled shrimp, avocado & spicy mayo",
      },
    ],
  },
  {
    id: "ura-maki-special",
    categoryId: "sushi-classics",
    title: "Ura Maki Special (4 pieces) — €12.00",
    items: [
      {
        name: "Philadelphia",
        category: "sushi-classics",
        price: "€12.00",
        desc: "Rice, nori, smoked salmon, raw salmon, avocado, cheese, cucumber, teriyaki sauce & sesame mix",
      },
      {
        name: "Rambo",
        category: "sushi-classics",
        price: "€12.00",
        desc: "Rice, boiled shrimp, salmon, tuna, avocado, cheese, cucumber & nori",
      },
      {
        name: "New California",
        category: "sushi-classics",
        price: "€12.00",
        desc: "Rice, crab & mayo, avocado, cucumber, caviar & nori",
      },
      {
        name: "Pink Pincer",
        category: "sushi-classics",
        price: "€12.00",
        desc: "Rice, crab & mayo, shrimp tempura, avocado, sesame sauce, nori & sriracha sauce",
      },
      {
        name: "Katar Barir",
        category: "sushi-classics",
        price: "€12.00",
        desc: "Rice, eel, avocado, cucumber, sesame mix, teriyaki sauce & nori",
      },
      {
        name: "Pyramids",
        category: "sushi-classics",
        price: "€12.00",
        desc: "Crispy rice, tempura shrimp, salmon, eel, avocado, cheese, teriyaki sauce & nori",
      },
      {
        name: "New Philadelphia",
        category: "sushi-classics",
        price: "€12.00",
        desc: "Rice, nori, smoked salmon, shrimp tempura, avocado, cheese, teriyaki sauce & sesame mix",
      },
      {
        name: "Crispy Shrimp Tempura",
        category: "sushi-classics",
        price: "€12.00",
        desc: "Crispy rice, shrimp tempura, avocado, teriyaki sauce & nori",
      },
    ],
  },

  {
    id: "hoso-maki",
    categoryId: "rolls-combos",
    title: "Hoso Maki (6 pieces) — €8.00",
    items: [
      {
        name: "Salmon",
        category: "rolls-combos",
        price: "€8.00",
        desc: "Rice & nori",
      },
      {
        name: "Tuna",
        category: "rolls-combos",
        price: "€8.00",
        desc: "Rice & nori",
      },
      {
        name: "Shrimp",
        category: "rolls-combos",
        price: "€8.00",
        desc: "Boiled shrimp, rice & nori",
      },
      {
        name: "Eel",
        category: "rolls-combos",
        price: "€8.00",
        desc: "Rice, nori, teriyaki sauce & sesame mix",
      },
      {
        name: "Crab",
        category: "rolls-combos",
        price: "€8.00",
        desc: "Rice & nori",
      },
      {
        name: "Shrimp Tempura",
        category: "rolls-combos",
        price: "€8.00",
        desc: "Rice, nori, teriyaki sauce & sesame mix",
      },
    ],
  },
  {
    id: "fried-rolls",
    categoryId: "rolls-combos",
    title: "Fried Rolls — €12.00",
    items: [
      {
        name: "Hot Lemon (6 pieces)",
        category: "rolls-combos",
        price: "€12.00",
        desc: "Rice, nori, salmon, tempura shrimp, cheese, green onion & spicy lemon",
      },
      {
        name: "Hot Halloween (6 pieces)",
        category: "rolls-combos",
        price: "€12.00",
        desc: "Rice, nori, salmon, crab, shrimp tempura, cheese, caviar, green onion, avocado, spicy mayo & teriyaki sauce",
      },
      {
        name: "Hot Panko (4 pieces)",
        category: "rolls-combos",
        price: "€12.00",
        desc: "Rice, nori, shrimp tempura, cheese, caviar, panko, green onion, avocado, mayo & teriyaki sauce",
      },
      {
        name: "Hot Crazy (4 pieces)",
        category: "rolls-combos",
        price: "€12.00",
        desc: "Crispy rice, salmon, crab & spicy mayo",
      },
      {
        name: "Hot Shrimp Tempura (4 pieces)",
        category: "rolls-combos",
        price: "€12.00",
        desc: "Rice, nori, shrimp tempura, cheese & teriyaki sauce",
      },
    ],
  },
  {
    id: "temaki",
    categoryId: "rolls-combos",
    title: "Temaki (1 piece) — €9.00",
    items: [
      {
        name: "Salmon",
        category: "rolls-combos",
        price: "€9.00",
        desc: "Rice, nori & avocado",
      },
      {
        name: "Tuna",
        category: "rolls-combos",
        price: "€9.00",
        desc: "Rice, nori & avocado",
      },
      {
        name: "Crab",
        category: "rolls-combos",
        price: "€9.00",
        desc: "Rice, nori & avocado",
      },
      {
        name: "Octopus",
        category: "rolls-combos",
        price: "€9.00",
        desc: "Rice, nori & avocado",
      },
      {
        name: "Eel",
        category: "rolls-combos",
        price: "€9.00",
        desc: "Rice, nori, avocado, sesame & teriyaki sauce",
      },
      {
        name: "Boiled Shrimp",
        category: "rolls-combos",
        price: "€9.00",
        desc: "Rice, nori & avocado",
      },
      {
        name: "Shrimp Tempura",
        category: "rolls-combos",
        price: "€9.00",
        desc: "Rice, nori, avocado, sesame & teriyaki sauce",
      },
    ],
  },
  {
    id: "vegetarian",
    categoryId: "rolls-combos",
    title: "Vegetarian",
    items: [
      {
        name: "Ora Green (4 pieces)",
        category: "rolls-combos",
        price: "€4.00",
        desc: "Rice, nori, avocado, cucumber, cheese, sun-dried tomatoes & sesame mix",
      },
      {
        name: "Hoso Cucumber (6 pieces)",
        category: "rolls-combos",
        price: "€3.00",
        desc: "Rice, nori & cucumber",
      },
      {
        name: "Hoso Avocado (6 pieces)",
        category: "rolls-combos",
        price: "€3.00",
        desc: "Rice, nori & avocado",
      },
      {
        name: "Oshi Green (3 pieces)",
        category: "rolls-combos",
        price: "€4.00",
        desc: "Rice, cucumber, cheese & mushroom",
      },
      {
        name: "Avocado Nigiri (1 piece)",
        category: "rolls-combos",
        price: "€1.00",
        desc: "Rice, nori & avocado",
      },
    ],
  },
  {
    id: "dynamite",
    categoryId: "rolls-combos",
    title: "Dynamite (4 pieces) — €12.00",
    items: [
      {
        name: "Dynamite Salmon",
        category: "rolls-combos",
        price: "€12.00",
        desc: "Rice, nori, salmon & cheese",
      },
      {
        name: "Dynamite Mix",
        category: "rolls-combos",
        price: "€12.00",
        desc: "Rice, nori, salmon, boiled shrimp, green onion & mayo",
      },
      {
        name: "Dynamite Shrimp Tempura",
        category: "rolls-combos",
        price: "€12.00",
        desc: "Rice, nori, salmon, shrimp tempura, teriyaki sauce & sesame mix",
      },
      {
        name: "Wall Dynamite",
        category: "rolls-combos",
        price: "€12.00",
        desc: "Rice, nori, salmon, boiled shrimp & cheese",
      },
    ],
  },
  {
    id: "mix-plates",
    categoryId: "rolls-combos",
    title: "Mix Plates (Chef Selection)",
    subtitle: "A mix assortment of nigiri, sashimi, and rolls from Chef selection",
    items: [
      {
        name: "Medium (24 pieces)",
        category: "rolls-combos",
        price: "€40.00",
        desc: "A mix assortment of nigiri, sashimi, and rolls from Chef selection",
      },
      {
        name: "Large (50 pieces)",
        category: "rolls-combos",
        price: "€70.00",
        desc: "A mix assortment of nigiri, sashimi, and rolls from Chef selection",
      },
    ],
  },

  // ─── PAGE 4: Main Course, Pasta & Dessert ───────────────────────────────────
  {
    id: "main-course",
    categoryId: "mains-desserts",
    title: "Main Course",
    subtitle: "Coming Soon",
    items: [
      {
        name: "Salmon Teriyaki",
        category: "mains-desserts",
        price: "Coming Soon",
      },
      {
        name: "Fried Seafood",
        category: "mains-desserts",
        price: "Coming Soon",
      },
    ],
  },
  {
    id: "pasta",
    categoryId: "mains-desserts",
    title: "Pasta",
    subtitle: "Coming Soon",
    items: [
      {
        name: "Bluefish Linguine",
        category: "mains-desserts",
        price: "Coming Soon",
      },
      {
        name: "Miso Pasta",
        category: "mains-desserts",
        price: "Coming Soon",
      },
    ],
  },
  {
    id: "dessert",
    categoryId: "mains-desserts",
    title: "Dessert",
    items: [
      {
        name: "Mochi (1 piece)",
        category: "mains-desserts",
        price: "€5.00",
        desc: "Vanilla, chocolate, mango, lemon, strawberry",
      },
      {
        name: "Sweet Rolls",
        category: "mains-desserts",
        price: "Chef Special",
      },
      {
        name: "Tiramisu",
        category: "mains-desserts",
        price: "Chef Special",
        desc: "Matcha & White Chocolate",
      },
      {
        name: "Cheesecake",
        category: "mains-desserts",
        price: "Chef Special",
        desc: "Yuzu & Pistachio",
      },
      {
        name: "Panna Cotta",
        category: "mains-desserts",
        price: "Chef Special",
        desc: "Coconut, Yuzu & Mango",
      },
    ],
  },

  // ─── PAGE 5: Beverages & Wine ───────────────────────────────────────────────
  {
    id: "soft-drinks",
    categoryId: "beverages-wine",
    title: "Soft Drinks",
    items: [
      { name: "Still Water Small", category: "beverages-wine", price: "€2.50" },
      { name: "Still Water Large", category: "beverages-wine", price: "€3.50" },
      { name: "Sparkling Water", category: "beverages-wine", price: "€2.80" },
      { name: "Coca-Cola", category: "beverages-wine", price: "€2.50" },
      { name: "Coca-Cola Zero", category: "beverages-wine", price: "€2.50" },
      { name: "Sprite", category: "beverages-wine", price: "€2.50" },
      { name: "Fanta", category: "beverages-wine", price: "€2.50" },
      { name: "Fever-Tree", category: "beverages-wine", price: "€3.50" },
      { name: "Red Bull", category: "beverages-wine", price: "€4.00" },
      { name: "Fresh Juice", category: "beverages-wine", price: "€3.50" },
    ],
  },
  {
    id: "coffee",
    categoryId: "beverages-wine",
    title: "Coffee",
    items: [
      { name: "Espresso", category: "beverages-wine", price: "€2.50" },
      { name: "Macchiato", category: "beverages-wine", price: "€3.00" },
      { name: "Cappuccino", category: "beverages-wine", price: "€3.50" },
      { name: "Iced Coffee", category: "beverages-wine", price: "€3.50" },
      { name: "Matcha Latte", category: "beverages-wine", price: "€3.50" },
    ],
  },
  {
    id: "beers",
    categoryId: "beverages-wine",
    title: "Beers — €6.00",
    items: [
      { name: "Heineken", category: "beverages-wine", price: "€6.00" },
      { name: "Stella", category: "beverages-wine", price: "€6.00" },
      { name: "Sakara", category: "beverages-wine", price: "€6.00" },
      { name: "Meister Max", category: "beverages-wine", price: "€6.00" },
      { name: "Sol", category: "beverages-wine", price: "€6.00" },
    ],
  },
  {
    id: "wine",
    categoryId: "beverages-wine",
    title: "Wine (Glass / Bottle)",
    items: [
      {
        name: "Cape Bay",
        category: "beverages-wine",
        price: "€6.00 / €30.00",
        desc: "White / Red",
      },
      {
        name: "Château de Granville",
        category: "beverages-wine",
        price: "€7.00 / €35.00",
        desc: "White / Red",
      },
      {
        name: "Château Byblos",
        category: "beverages-wine",
        price: "€8.00 / €40.00",
        desc: "White / Red",
      },
      {
        name: "Castello di Trevi",
        category: "beverages-wine",
        price: "€7.00 / €35.00",
        desc: "White / Rosé",
      },
    ],
  },
  {
    id: "sparkling-wine",
    categoryId: "beverages-wine",
    title: "Sparkling Wine (Glass / Bottle)",
    items: [
      {
        name: "Le Baron Rosé",
        category: "beverages-wine",
        price: "€9.00 / €45.00",
      },
      {
        name: "Le Baron White",
        category: "beverages-wine",
        price: "€9.00 / €45.00",
      },
    ],
  },

  // ─── PAGE 6: Cocktails, Mocktails & Shoots ──────────────────────────────────
  {
    id: "classic-cocktails",
    categoryId: "cocktails-shoots",
    title: "Classic Cocktails — €11.00",
    items: [
      { name: "Orange Spritz", category: "cocktails-shoots", price: "€11.00" },
      { name: "Red Spritz", category: "cocktails-shoots", price: "€11.00" },
      { name: "Lemon Spritz", category: "cocktails-shoots", price: "€11.00" },
      { name: "Hugo Spritz", category: "cocktails-shoots", price: "€11.00" },
      { name: "Bellini", category: "cocktails-shoots", price: "€11.00" },
      { name: "Rossini", category: "cocktails-shoots", price: "€11.00" },
      { name: "Negroni", category: "cocktails-shoots", price: "€11.00" },
    ],
  },
  {
    id: "signature-cocktails",
    categoryId: "cocktails-shoots",
    title: "Signature Cocktails — €12.00",
    items: [
      {
        name: "Yuzu Mojito",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "Yuzu, mint leaves, lemon wedge, soda",
      },
      {
        name: "Japanese Highball",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "Whisky, sour mix, soda",
      },
      {
        name: "Iced Coconut Matcha",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "Smoothie piña colada, matcha top",
      },
      {
        name: "Samurai Cocktail",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "Cheetos dust/puree, vodka, hot chili",
      },
      {
        name: "Saki Spritz",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "Sake liqueur, champagne, soda",
      },
      {
        name: "Lichee Martini",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "Lychee puree, sour mix, mix berry",
      },
      {
        name: "Tokyo Mule",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "Green tea, ginger, vodka, soda",
      },
      {
        name: "Sakura",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "Vodka, white wine, blueberry puree, sour mix",
      },
      {
        name: "Sake Mary",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "Sake, tomato juice, sour mix, wasabi, tabasco, salt, black pepper",
      },
      {
        name: "Tokyo Drift",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "Gin, sour mix, ginger, cucumber slices, top soda",
      },
    ],
  },
  {
    id: "mocktails",
    categoryId: "cocktails-shoots",
    title: "Mocktails — €8.00",
    items: [
      {
        name: "Mai Tiki",
        category: "cocktails-shoots",
        price: "€8.00",
        desc: "Orgeat, mango, orange, passion syrup",
      },
      {
        name: "Sweet Dreams",
        category: "cocktails-shoots",
        price: "€8.00",
        desc: "Strawberry juice, apple juice, peach flavor",
      },
      {
        name: "Bora Bora",
        category: "cocktails-shoots",
        price: "€8.00",
        desc: "Mango, strawberry, orange",
      },
      {
        name: "Moscow Mango Mule",
        category: "cocktails-shoots",
        price: "€8.00",
        desc: "Ice cream mango, mango juice, coconut cream",
      },
    ],
  },
  {
    id: "shoots",
    categoryId: "cocktails-shoots",
    title: "Shoots (Shots) — €7.00",
    items: [
      {
        name: "Spring Paradise",
        category: "cocktails-shoots",
        price: "€7.00",
        desc: "Slice pineapple, dark rum, orgeat, lemon, blue curaçao",
      },
      {
        name: "Irish Maid",
        category: "cocktails-shoots",
        price: "€7.00",
        desc: "Slice cucumber, lemon, elderflower, Irish whisky",
      },
      {
        name: "Black Xiaoshang",
        category: "cocktails-shoots",
        price: "€7.00",
        desc: "Marshmallow vodka, coffee liqueur, maple syrup",
      },
      {
        name: "S More",
        category: "cocktails-shoots",
        price: "€7.00",
        desc: "Vodka, cranberry, lemon, blue curaçao",
      },
      {
        name: "Flaming Lamborghini",
        category: "cocktails-shoots",
        price: "€7.00",
        desc: "Cocktail served with Fire Show",
      },
    ],
  },
];

export const menuItemsData: MenuItem[] = menuSectionsData.flatMap(
  (section) => section.items
);
