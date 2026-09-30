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
        desc: "sea salt",
        image: "/images/menu/edamame-salt.JPEG",
      },
      {
        name: "Crackers",
        category: "starters-bowls",
        price: "€2.00",
        desc: "with teriyaki sauce",
        image: "/images/menu/crackers.JPEG",
      },
      {
        name: "Edamame",
        category: "starters-bowls",
        price: "€5.00",
        desc: "sweet sherry sauce",
        image: "/images/menu/edamame-sweet-sherry.JPEG",
      },

      {
        name: "Panko Salmon",
        category: "starters-bowls",
        price: "€8.00",
        desc: "green onion & spicy/ouzo sauce",
        image: "/images/menu/panko-salamon.JPEG",
      },
      {
        name: "Panko Tuna",
        category: "starters-bowls",
        price: "€8.00",
        desc: "green onion & spicy/ouzo sauce",
        image: "/images/menu/panko-tuna.JPEG",
      },
      {
        name: "Tempura Shrimps",
        category: "starters-bowls",
        price: "€8.50",
        desc: "& sweet sherry sauce",
        image: "/images/menu/tempura-shrimps.JPEG",
      },
      {
        name: "Fried Calamari",
        category: "starters-bowls",
        price: "€6.00",
        desc: "& tartare sauce",
        image: "/images/menu/fried-calamari.JPEG",
      },
      {
        name: "Fried Shrimps Panko",
        category: "starters-bowls",
        price: "€9.00",
        desc: "& mango/kiwi/strawberry sauce or classic mayo",
        image: "/images/menu/Fried-Shrimps-Panko.JPEG",
      },
      {
        name: "French Fries",
        category: "starters-bowls",
        price: "€3.00",
        desc: "with ketchup & mayo",
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
        desc: "broth/dashi, wakame, green onion & tofu cheese",
        image: "/images/menu/miso.JPEG",

      },
      {
        name: "Coconut Milk",
        category: "starters-bowls",
        price: "€12.00",
        desc: "calamari & crabs",
        image: "/images/menu/coconut-milk.JPEG",

      },
      {
        name: "Tom Yum",
        category: "starters-bowls",
        price: "€9.00",
        desc: "broth/dashi, garlic, ginger, shrimps & japan spicy",
        image: "/images/menu/tom-yum.JPEG",

      },
      {
        name: "Mix Seafood",
        category: "starters-bowls",
        price: "€15.00",
        desc: "shrimps, calamari, mussels, cheddar cheese, garlic & ginger",
        image: "/images/menu/mix-seafood.JPEG",
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
        desc: "shrimps, avocado, cucumber, caviar & spicy/classic mayo",
        image: "/images/menu/crab-salad.JPEG",

      },
      {
        name: "Ceviche",
        category: "starters-bowls",
        price: "€10.00",
        desc: "tuna or salmon, red onion, coriander, cucumber, avocado, cherry tomatoes & hot pepper",
        image: "/images/menu/ceviche.JPEG",

      },
      {
        name: "Taco",
        category: "starters-bowls",
        price: "€6.00",
        desc: "octopus, avocado, coriander, cherry tomatoes & balsamic vinegar",
        image: "/images/menu/taco.JPEG",
      },
      {
        name: "Seaweed & Sesame Mix",
        category: "starters-bowls",
        price: "€6.00",
        desc: "fresh seaweed salad tossed with toasted sesame mix",
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
        desc: "bell peppers, carrots, white onion",
        image: "/images/menu/shrimp-noodles.JPEG",
      },
      {
        name: "Vegetables Noodles",
        category: "starters-bowls",
        price: "€8.00",
        desc: "bell peppers, carrots & white onion",
        image: "/images/menu/vegetables-noodles.JPEG",
      },
      {
        name: "Ramen",
        category: "starters-bowls",
        price: "€10.00",
        desc: "shrimps, garlic, ginger, mushrooms and cream",
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
        desc: "base protein: salmon / tuna / shrimp • choose your 4 sides: pineapple, sweet corn, avocado, edamame, seaweed salad, fried onions, green onion",
        image: "/images/menu/poke-bowl.JPEG",
      },
    ],
  },

  {
    id: "nigiri",
    categoryId: "sushi-classics",
    title: "Nigiri (1 piece) — €1.50",
    items: [
      {
        name: "Salmon", category: "sushi-classics", price: "€1.50",
        image: "/images/menu/nigiri-salmon.JPEG",
      },
      {
        name: "Tuna", category: "sushi-classics", price: "€1.50",
        image: "/images/menu/nigiri-tuna.JPEG",
      },
      {
        name: "Shrimp boiled", category: "sushi-classics", price: "€1.50",
        image: "/images/menu/nigiri-shrimp.JPEG",
      },
      {
        name: "Crab", category: "sushi-classics", price: "€1.50",
        image: "/images/menu/nigiri-crab.JPEG",
      },
      {
        name: "Calamari & caviar", category: "sushi-classics", price: "€1.50",
        image: "/images/menu/nigiri-caviar.JPEG",
      },
      {
        name: "Octopus", category: "sushi-classics", price: "€1.50",
        image: "/images/menu/nigiri-octopus.JPEG",
      },
      {
        name: "Seabass", category: "sushi-classics", price: "€1.50",
        image: "/images/menu/seabass-nigiri.JPEG",
      },
      {
        name: "Eel teriyaki & sesame", category: "sushi-classics", price: "€1.50",
        image: "/images/menu/nigiri-eel.JPEG",
      },
      {
        name: "Caviar rice & nori", category: "sushi-classics", price: "€1.50",
        image: "/images/menu/caviar-rice.JPEG",
      },
      {
        name: "Shrimp tempura & teriyaki", category: "sushi-classics", price: "€1.50",
        image: "/images/menu/nigiri-shrim-tamboura.JPEG",
      },
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
        desc: "rice, nori & sesame mix",
        image: "/images/menu/uramaki-salmon.JPEG",

      },
      {
        name: "Tuna",
        category: "sushi-classics",
        price: "€8.00",
        desc: "rice, nori & sesame mix",
        image: "/images/menu/ura-maki-tuna.JPEG",
      },
      {
        name: "Shrimp Tempura",
        category: "sushi-classics",
        price: "€8.00",
        desc: "rice, nori & sesame mix",
        image: "/images/menu/uramaki-tempura.JPEG",
      },
      {
        name: "California",
        category: "sushi-classics",
        price: "€8.00",
        desc: "crab, rice, nori, avocado, cucumber & sesame mix",
        image: "/images/menu/california.JPEG",
      },
    ],
  },
  {
    id: "sashimi",
    categoryId: "sushi-classics",
    title: "Sashimi (4 pieces) — €12.00",
    items: [
      {
        name: "Salmon", category: "sushi-classics", price: "€12.00",
        image: "/images/menu/sashimi-salmon.JPEG",
      },
      {
        name: "Tuna", category: "sushi-classics", price: "€12.00",
        image: "/images/menu/sashimi-tuna.JPEG",
      },
      {
        name: "Calamari & caviar", category: "sushi-classics", price: "€12.00",
        image: "/images/menu/sashimi-calamari.JPEG",
      },

      {
        name: "Octopus", category: "sushi-classics", price: "€12.00",
        image: "/images/menu/sashimi-octobus.JPEG",
      },
      {
        name: "Seabass", category: "sushi-classics", price: "€12.00",
      },
      {
        name: "Fried Salmon",
        category: "sushi-classics",
        price: "€12.00",
        desc: "with teriyaki sauce or spicy/lemon mayo",
        image: "/images/menu/fried-salmon.JPEG",
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
        desc: "crispy rice, tuna, cheddar cheese, caviar & sesame mix",
        image: "/images/menu/nigiri-special-cheddar-tuna.JPEG",
      },
      {
        name: "Crispy Cheddar Salmon",
        category: "sushi-classics",
        price: "€2.50",
        desc: "crispy rice, salmon, cheddar cheese, caviar & sesame mix",
        image: "/images/menu/nigiri-special-cheddar-salmon.JPEG",

      },
      {
        name: "Salmon Tataki",
        category: "sushi-classics",
        price: "€2.50",
        desc: "salmon tataki, black pepper, garlic, yuzu sauce & green onion",
        image: "/images/menu/salmon-tataki.JPEG",
      },
      {
        name: "Crispy Mix",
        category: "sushi-classics",
        price: "€2.50",
        desc: "crispy rice, salmon, shrimp tempura, green onion & sesame sauce",
        image: "/images/menu/crispy-mix.JPEG",
      },
      {
        name: "Tuna Tataki",
        category: "sushi-classics",
        price: "€2.50",
        desc: "tuna tataki, crispy rice, black pepper, garlic, yuzu sauce & green onion",
        image: "/images/menu/tuna-tataki.JPEG",

      },
      {
        name: "Spicy Tuna",
        category: "sushi-classics",
        price: "€2.50",
        desc: "tuna, rice, sriracha sauce & spicy pepper",
        image: "/images/menu/spicy-tuna.JPEG",
      },
      {
        name: "Crispy Shrimp Avocado",
        category: "sushi-classics",
        price: "€2.50",
        desc: "crispy rice, boiled shrimp, avocado & spicy mayo",
        image: "/images/menu/nigiri-special-shrimp-avocado.JPEG",
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
        desc: "rice, nori, smoked salmon, raw salmon, avocado, cheese, cucumber, teriyaki sauce & sesame mix",
        image: "/images/menu/ura-maki-special-philadelphia.JPEG",
      },
      {
        name: "Rambo",
        category: "sushi-classics",
        price: "€12.00",
        desc: "rice, boiled shrimp, salmon, tuna, avocado, cheese, cucumber & nori",
        image: "/images/menu/ura-maki-special-rambo.jpeg",
      },
      {
        name: "New California",
        category: "sushi-classics",
        price: "€12.00",
        desc: "rice, crab & mayo, avocado, cucumber, caviar & nori",
        image: "/images/menu/ura-maki-special-new-california.jpeg",
      },
      {
        name: "Pink Pincer",
        category: "sushi-classics",
        price: "€12.00",
        desc: "rice, crab & mayo, shrimp tempura, avocado, sesame sauce, nori & sriracha sauce",
        image: "/images/menu/ura-maki-pink-pincer.JPEG",
      },
      {
        name: "Katar Barir",
        category: "sushi-classics",
        price: "€12.00",
        desc: "rice, eel, avocado, cucumber, sesame mix, teriyaki sauce & nori",
        image: "/images/menu/katar-barir.JPEG",
      },
      {
        name: "Pyramids",
        category: "sushi-classics",
        price: "€12.00",
        desc: "crispy rice, tempura shrimp, salmon, eel, avocado, cheese, teriyaki sauce & nori",
        image: "/images/menu/pyramids.JPEG",
      },
      {
        name: "New Philadelphia",
        category: "sushi-classics",
        price: "€12.00",
        desc: "rice, nori, smoked salmon, shrimp tempura, avocado, cheese, teriyaki sauce & sesame mix",
        image: "/images/menu/new-philadelphia.JPEG",
      },
      {
        name: "Crispy Shrimp Tempura",
        category: "sushi-classics",
        price: "€12.00",
        desc: "crispy rice, shrimp tempura, avocado, teriyaki sauce & nori",
        image: "/images/menu/ura-maki-special-crispy-shrim-tempura.JPEG",
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
        desc: "rice & nori",
        image: "/images/menu/hoso-maki-salmon.JPEG",

      },
      {
        name: "Tuna",
        category: "rolls-combos",
        price: "€8.00",
        desc: "rice & nori",
        image: "/images/menu/hosomaki-tunaa.JPEG",

      },
      {
        name: "Shrimp",
        category: "rolls-combos",
        price: "€8.00",
        desc: "boiled shrimp, rice & nori",
        image: "/images/menu/hoso-maki-shrimp.JPEG",

      },
      {
        name: "Eel",
        category: "rolls-combos",
        price: "€8.00",
        desc: "rice, nori, teriyaki sauce & sesame mix",
        image: "/images/menu/hoso-maki-eel.JPEG",

      },
      {
        name: "Crab",
        category: "rolls-combos",
        price: "€8.00",
        desc: "rice & nori",
      },
      {
        name: "Shrimp Tempura",
        category: "rolls-combos",
        price: "€8.00",
        desc: "rice, nori, teriyaki sauce & sesame mix",
        image: "/images/menu/hosomaki-shrimps-tempura.JPEG",

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
        desc: "rice, nori, salmon, tempura shrimp, cheese, green onion & spicy lemon",
        image: "/images/menu/fried-hot-lemon.JPEG",
      },
      {
        name: "Hot Halloween (6 pieces)",
        category: "rolls-combos",
        price: "€12.00",
        desc: "rice, nori, salmon, crab, shrimp tempura, cheese, caviar, green onion, avocado, spicy mayo & teriyaki sauce",
        image: "/images/menu/fried-hot-halloween.JPEG",
      },
      {
        name: "Hot Panko (4 pieces)",
        category: "rolls-combos",
        price: "€12.00",
        desc: "rice, nori, shrimp tempura, cheese, caviar, panko, green onion, avocado, mayo & teriyaki sauce",
        image: "/images/menu/fried-hot-panko.JPEG",
      },
      {
        name: "Hot Crazy (4 pieces)",
        category: "rolls-combos",
        price: "€12.00",
        desc: "crispy rice, salmon, crab & spicy mayo",
        image: "/images/menu/fried-hot-crazy.JPEG",
      },
      {
        name: "Hot Shrimp Tempura (4 pieces)",
        category: "rolls-combos",
        price: "€12.00",
        desc: "rice, nori, shrimp tempura, cheese & teriyaki sauce",
        image: "/images/menu/fried-hot-shrimp-tempura.JPEG",
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
        desc: "rice, nori & avocado",
        image: "/images/menu/temaki-salmon.JPEG",

      },
      {
        name: "Tuna",
        category: "rolls-combos",
        price: "€9.00",
        desc: "rice, nori & avocado",
        image: "/images/menu/temaki-tuna.JPEG",
      },
      {
        name: "Crab",
        category: "rolls-combos",
        price: "€9.00",
        desc: "rice, nori & avocado",
        image: "/images/menu/termaki-crab.JPEG",
      },
      {
        name: "Octopus",
        category: "rolls-combos",
        price: "€9.00",
        desc: "rice, nori & avocado",
        image: "/images/menu/temaki-octopus.JPEG",
      },
      {
        name: "Eel",
        category: "rolls-combos",
        price: "€9.00",
        desc: "rice, nori, avocado, sesame & teriyaki sauce",
        image: "/images/menu/temaki-eel.JPEG",
      },
      {
        name: "Boiled Shrimp",
        category: "rolls-combos",
        price: "€9.00",
        desc: "rice, nori & avocado",
      },
      {
        name: "Shrimp Tempura",
        category: "rolls-combos",
        price: "€9.00",
        desc: "rice, nori, avocado, sesame & teriyaki sauce",
        image: "/images/menu/temaki-shrimp-tempura.JPEG",
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
        desc: "rice, nori, avocado, cucumber, cheese, sun-dried tomatoes & sesame mix",
        image: "/images/menu/ora-green.JPEG",

      },
      {
        name: "Hoso Cucumber (6 pieces)",
        category: "rolls-combos",
        price: "€3.00",
        desc: "rice, nori & cucumber",
        image: "/images/menu/hoso-cucomber.JPEG",
      },
      {
        name: "Hoso Avocado (6 pieces)",
        category: "rolls-combos",
        price: "€3.00",
        desc: "rice, nori & avocado",
        image: "/images/menu/hoso-avocado.JPEG",
      },
      {
        name: "Oshi Green (3 pieces)",
        category: "rolls-combos",
        price: "€4.00",
        desc: "rice, cucumber, cheese & mushroom",
        image: "/images/menu/osho-grem.JPEG",
      },
      {
        name: "Avocado Nigiri (1 piece)",
        category: "rolls-combos",
        price: "€1.00",
        desc: "rice, nori & avocado",
        image: "/images/menu/avocado-nigiri.JPEG",

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
        desc: "rice, nori, salmon & cheese",
        image: "/images/menu/dinamte-salmon.JPEG",
      },
      {
        name: "Dynamite Mix",
        category: "rolls-combos",
        price: "€12.00",
        desc: "rice, nori, salmon, boiled shrimp, green onion & mayo",
        image: "/images/menu/dinamite-mix.JPEG",
      },
      {
        name: "Dynamite Shrimp Tempura",
        category: "rolls-combos",
        price: "€12.00",
        desc: "rice, nori, salmon, shrimp tempura, teriyaki sauce & sesame mix",
        image: "/images/menu/dynamite-tempura.JPEG",
      },
      {
        name: "Wall Dynamite",
        category: "rolls-combos",
        price: "€12.00",
        desc: "rice, nori, salmon, boiled shrimp & cheese",
        image: "/images/menu/dinamte-wall.JPEG",
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
        desc: "a mix assortment of nigiri, sashimi, and rolls from chef selection",
      },
      {
        name: "Large (50 pieces)",
        category: "rolls-combos",
        price: "€70.00",
        desc: "a mix assortment of nigiri, sashimi, and rolls from chef selection",
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
        desc: "vanilla, chocolate, mango, lemon, strawberry",
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
        desc: "matcha & white chocolate",
      },
      {
        name: "Cheesecake",
        category: "mains-desserts",
        price: "Chef Special",
        desc: "yuzu & pistachio",
      },
      {
        name: "Panna Cotta",
        category: "mains-desserts",
        price: "Chef Special",
        desc: "coconut, yuzu & mango",
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
        desc: "white / red",
      },
      {
        name: "Château de Granville",
        category: "beverages-wine",
        price: "€7.00 / €35.00",
        desc: "white / red",
      },
      {
        name: "Château Byblos",
        category: "beverages-wine",
        price: "€8.00 / €40.00",
        desc: "white / red",
      },
      {
        name: "Castello di Trevi",
        category: "beverages-wine",
        price: "€7.00 / €35.00",
        desc: "white / rosé",
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
        desc: "yuzu, mint leaves, lemon wedge, soda",
      },
      {
        name: "Japanese Highball",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "whisky, sour mix, soda",
      },
      {
        name: "Iced Coconut Matcha",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "smoothie piña colada, matcha top",
      },
      {
        name: "Samurai Cocktail",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "cheetos dust/puree, vodka, hot chili",
      },
      {
        name: "Saki Spritz",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "sake liqueur, champagne, soda",
      },
      {
        name: "Lichee Martini",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "lychee puree, sour mix, mix berry",
      },
      {
        name: "Tokyo Mule",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "green tea, ginger, vodka, soda",
      },
      {
        name: "Sakura",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "vodka, white wine, blueberry puree, sour mix",
      },
      {
        name: "Sake Mary",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "sake, tomato juice, sour mix, wasabi, tabasco, salt, black pepper",
      },
      {
        name: "Tokyo Drift",
        category: "cocktails-shoots",
        price: "€12.00",
        desc: "gin, sour mix, ginger, cucumber slices, top soda",
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
        desc: "orgeat, mango, orange, passion syrup",
      },
      {
        name: "Sweet Dreams",
        category: "cocktails-shoots",
        price: "€8.00",
        desc: "strawberry juice, apple juice, peach flavor",
      },
      {
        name: "Bora Bora",
        category: "cocktails-shoots",
        price: "€8.00",
        desc: "mango, strawberry, orange",
      },
      {
        name: "Moscow Mango Mule",
        category: "cocktails-shoots",
        price: "€8.00",
        desc: "ice cream mango, mango juice, coconut cream",
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
        desc: "slice pineapple, dark rum, orgeat, lemon, blue curaçao",
      },
      {
        name: "Irish Maid",
        category: "cocktails-shoots",
        price: "€7.00",
        desc: "slice cucumber, lemon, elderflower, irish whisky",
      },
      {
        name: "Black Xiaoshang",
        category: "cocktails-shoots",
        price: "€7.00",
        desc: "marshmallow vodka, coffee liqueur, maple syrup",
      },
      {
        name: "S More",
        category: "cocktails-shoots",
        price: "€7.00",
        desc: "vodka, cranberry, lemon, blue curaçao",
      },
      {
        name: "Flaming Lamborghini",
        category: "cocktails-shoots",
        price: "€7.00",
        desc: "cocktail served with fire show",
      },
    ],
  },
];

export const menuItemsData: MenuItem[] = menuSectionsData.flatMap(
  (section) => section.items
);
