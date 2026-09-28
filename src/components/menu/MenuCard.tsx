"use client";

import { useState } from "react";
import Image from "next/image";
import { menuSectionsData, menuCategories, POLICY_NOTE } from "@/data/menuData";
import { MenuItem } from "@/types";
import { SkeletonOverlay } from "@/components/ui/ImageSkeleton";

function DishImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white shadow-md group-hover:shadow-lg group-hover:border-[#C68B59] transition-all duration-300 shrink-0 bg-[#E8F2F8]"
    >
      <SkeletonOverlay loaded={loaded} className="rounded-2xl sm:rounded-3xl" />
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function MenuCard() {
  const [activeCategory, setActiveCategory] = useState("starters-bowls");

  const displayedSections = menuSectionsData.filter(
    (sec) => sec.categoryId === activeCategory
  );

  return (
    <div className="relative py-12 sm:py-20 overflow-hidden bg-[#FAF6F0] font-sans">
      {/* ---------------------------------------------------- */}
      {/* Atmospheric Boho & Mediterranean Background Glows    */}
      {/* ---------------------------------------------------- */}
      <div className="absolute top-12 left-0 w-80 h-96 pointer-events-none opacity-40 lg:opacity-75 bg-gradient-to-br from-[#143D69]/15 via-[#0084D1]/10 to-transparent blur-3xl"></div>
      <div className="absolute top-10 right-0 w-80 h-80 pointer-events-none opacity-50 bg-[#C68B59]/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none opacity-40 lg:opacity-70 bg-gradient-to-tl from-[#143D69]/20 via-[#0084D1]/15 to-transparent blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Category Navigation Pills */}
        <div className="flex items-center justify-center overflow-x-auto pb-4 gap-2 sm:gap-3 mb-10 sm:mb-14">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-lg sm:text-xl font-normal transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-[#0B203B] text-white shadow-md"
                  : "bg-white/85 text-[#0B203B]/80 hover:bg-white hover:text-[#0B203B] border border-[#C68B59]/30 shadow-sm"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ---------------------------------------------------- */}
        {/* The Luxury Arched Menu Card                          */}
        {/* ---------------------------------------------------- */}
        <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto bg-[#FFFDF9] rounded-t-[120px] sm:rounded-t-[180px] md:rounded-t-[220px] rounded-b-3xl shadow-[0_20px_50px_rgba(11,32,59,0.12)] border border-[#C68B59]/30 p-6 sm:p-12 md:p-16 relative">
          {/* Arched Card Header with Enlarge Brand Logo */}
          <div className="text-center pt-4 sm:pt-6 pb-8 sm:pb-10 border-b border-[#C68B59]/25">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center mb-3">
                <Image
                  src="/logo.webp"
                  alt="Blue Fish Logo"
                  width={280}
                  height={90}
                  className="h-16 sm:h-20 md:h-24 w-auto object-contain"
                  priority
                />
              </div>

              {/* Subtitle in 1st Font with Ocean Blue Dots */}
              <p className="text-xl sm:text-2xl tracking-[0.15em] text-[#0B203B] uppercase font-normal mt-1">
                SEAFOOD<span className="text-[#0084D1] mx-1.5">•</span>SUSHI
                <span className="text-[#0084D1] mx-1.5">•</span>VISTA MARE
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* Menu Sections List with Boho Dish Photo & View Btn   */}
          {/* ---------------------------------------------------- */}
          <div className="space-y-12 sm:space-y-16 pt-8 sm:pt-12">
            {displayedSections.map((section) => (
              <div key={section.id} className="space-y-6 sm:space-y-8">
                {/* Section Header with Flanked Divider Lines */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-full flex items-center justify-center gap-4">
                    <div className="flex-1 h-px bg-[#C68B59]/35 max-w-[80px] sm:max-w-[150px]"></div>
                    <h2 className="text-3xl sm:text-4xl text-[#0B203B] font-normal tracking-[0.1em]">
                      {section.title}
                    </h2>
                    <div className="flex-1 h-px bg-[#C68B59]/35 max-w-[80px] sm:max-w-[150px]"></div>
                  </div>
                </div>

                {/* Items in Category */}
                <div className="space-y-6 sm:space-y-8 pt-2">
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center gap-4 sm:gap-6 p-2 sm:p-3 -mx-2 sm:-mx-3 rounded-2xl hover:bg-[#FAF6F0]/80 transition-all duration-300"
                    >
                      {/* Boho Dish Image Frame */}
                      {item.image && <DishImage src={item.image} alt={item.name} />}

                      {/* Dish Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-[#0B203B] tracking-wide group-hover:text-[#0084D1] transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-xl sm:text-2xl md:text-3xl font-normal text-[#0084D1] shrink-0">
                            {item.price}
                          </span>
                        </div>

                        {/* Ingredients / Description */}
                        <p className="text-base sm:text-lg md:text-xl text-[#0B203B]/75 leading-tight mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ---------------------------------------------------- */}
          {/* Card Footnote in 1st Font                            */}
          {/* ---------------------------------------------------- */}
          <div className="mt-14 sm:mt-16 pt-8 border-t border-[#C68B59]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm sm:text-base text-[#0B203B]/75">
            <p className="italic font-sans">
              * {POLICY_NOTE}
            </p>
            <p className="text-[#C68B59] text-base sm:text-lg">
              Port Ghalib Marina • Fresh Catch Daily
            </p>
          </div>
        </div>
      </div>


    </div>
  );
}
