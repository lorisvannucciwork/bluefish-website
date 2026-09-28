"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  List,
  ChevronDown,
  Check,
} from "lucide-react";
import { menuSectionsData, menuCategories } from "@/data/menuData";
import { MenuItem } from "@/types";



// ─── CATEGORY ICON MAP ─────────────────────────────────────────────────────
const catAccent: Record<string, string> = {
  all: "#C68B59",
  antipasti: "#E08050",
  primi: "#5A9E6E",
  secondi: "#0084D1",
  sushi: "#C05A7A",
  cocktails: "#8B5E9C",
};


export default function MenuCatalog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const currentCategory =
    menuCategories.find((c) => c.id === activeCategory) || menuCategories[0];
  const currentAccent = catAccent[activeCategory] || "#C68B59";

  const allItemsWithSection = useMemo(() => {
    return menuSectionsData.flatMap((section) =>
      section.items.map((item) => ({ ...item, sectionTitle: section.title }))
    );
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return allItemsWithSection;
    return allItemsWithSection.filter((item) => item.category === activeCategory);
  }, [allItemsWithSection, activeCategory]);

  const displayedSections = useMemo(() => {
    if (activeCategory === "all") return menuSectionsData;
    return menuSectionsData.filter((sec) => sec.id === activeCategory);
  }, [activeCategory]);

  return (
    <div
      id="menu"
      className="relative overflow-hidden font-sans"
      style={{ background: "#F5EFE7" }}
    >


      {/* Organic blob glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-100px",
          left: "-100px",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse, rgba(198,139,89,0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          right: "-80px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(0,132,209,0.12) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          left: "30%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(198,139,89,0.1) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 space-y-14">

        {/* ================================================================= */}
        {/* 2. FILTER CONTROLS — BOHO CRAFTED BAR                            */}
        {/* ================================================================= */}
        <div className={`relative ${isDropdownOpen ? "z-40" : "z-20"}`}>
          {/* Custom Category Dropdown Selector + View Mode Toggles */}
          <div
            className={`relative p-2 rounded-2xl flex items-center justify-between gap-3 ${
              isDropdownOpen ? "z-50" : "z-20"
            }`}
            style={{
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(198,139,89,0.2)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 20px rgba(139,80,40,0.06)",
            }}
          >
            {/* Custom Category Dropdown */}
            <div className="relative z-50" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300"
                style={{
                  background: isDropdownOpen
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.8)",
                  border: isDropdownOpen
                    ? `1px solid ${currentAccent}`
                    : "1px solid rgba(198,139,89,0.3)",
                  boxShadow: isDropdownOpen
                    ? `0 4px 18px ${currentAccent}33`
                    : "0 2px 8px rgba(139,80,40,0.05)",
                }}
              >
                <span
                  className="font-sans text-sm sm:text-base font-semibold tracking-wide"
                  style={{ color: "#0B203B" }}
                >
                  {currentCategory.name}
                </span>

                <ChevronDown
                  className="transition-transform duration-300 shrink-0 ml-1"
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "rgba(11,32,59,0.6)",
                    transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {/* Dropdown Menu Popup */}
              {isDropdownOpen && (
                <div
                  role="listbox"
                  className="absolute left-0 top-[calc(100%+8px)] w-64 sm:w-72 rounded-2xl p-2 z-50 transition-all duration-200"
                  style={{
                    background: "#FFFDF9",
                    border: "1px solid rgba(198,139,89,0.35)",
                    boxShadow:
                      "0 18px 45px rgba(11,32,59,0.2), 0 4px 14px rgba(139,80,40,0.1)",
                  }}
                >
                  <div
                    className="px-3 py-1.5 text-[0.65rem] tracking-[0.18em] uppercase font-semibold border-b mb-1.5"
                    style={{
                      color: "#C68B59",
                      borderColor: "rgba(198,139,89,0.15)",
                      fontFamily: "var(--font-montserrat), sans-serif",
                    }}
                  >
                    Select Category
                  </div>

                  <div className="space-y-1">
                    {menuCategories.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      const accent = catAccent[cat.id] || "#C68B59";

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            setActiveCategory(cat.id);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer"
                          style={{
                            background: isActive
                              ? `${accent}16`
                              : "transparent",
                            border: isActive
                              ? `1px solid ${accent}44`
                              : "1px solid transparent",
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              (e.currentTarget as HTMLElement).style.background =
                                "rgba(198,139,89,0.08)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              (e.currentTarget as HTMLElement).style.background =
                                "transparent";
                            }
                          }}
                        >
                          <span
                            className="font-sans text-sm truncate"
                            style={{
                              color: isActive ? accent : "#0B203B",
                              fontWeight: isActive ? 600 : 500,
                            }}
                          >
                            {cat.name}
                          </span>

                          {isActive && (
                            <Check
                              className="shrink-0 ml-2"
                              style={{
                                width: "14px",
                                height: "14px",
                                color: accent,
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* View Mode Toggles */}
            <div
              className="flex items-center gap-1.5 shrink-0 pl-3"
              style={{ borderLeft: "1px solid rgba(198,139,89,0.25)" }}
            >
              {[
                { mode: "grid" as const, Icon: LayoutGrid, label: "Plates View" },
                { mode: "list" as const, Icon: List, label: "List View" },
              ].map(({ mode, Icon, label }) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  aria-label={label}
                  title={label}
                  className="p-2.5 rounded-xl cursor-pointer transition-all duration-300"
                  style={{
                    background: viewMode === mode ? "#0B203B" : "transparent",
                    color: viewMode === mode ? "white" : "rgba(11,32,59,0.5)",
                    border:
                      viewMode === mode
                        ? "1px solid #0B203B"
                        : "1px solid transparent",
                  }}
                >
                  <Icon style={{ width: "15px", height: "15px" }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. MENU DISHES DISPLAY                                            */}
        {/* ================================================================= */}
        {filteredItems.length === 0 ? (
          <div
            className="text-center py-20 rounded-3xl space-y-4"
            style={{
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(198,139,89,0.2)",
            }}
          >
            <p className="font-sans text-3xl" style={{ color: "#0B203B" }}>
              No dishes matched.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="px-7 py-3 rounded-full font-sans text-base transition-all duration-300"
              style={{ background: "#0B203B", color: "white", border: "2px solid transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#C68B59";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#0B203B";
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* ================================================================= */
          /* BOHO COASTAL GRID — Unique Organic Cards                          */
          /* ================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, idx) => {
              const cardBg = "linear-gradient(145deg, #FFFDF9, #F8F0E5)";

              return (
                <div
                  key={idx}
                  className="group relative flex flex-col items-center text-center transition-all duration-500"
                  style={{
                    background: cardBg,
                    border: "1px solid rgba(198,139,89,0.2)",
                    borderRadius: "2.5rem",
                    padding: "2rem 1.5rem 1.5rem",
                    boxShadow: "0 8px 32px rgba(139,80,40,0.06), 0 2px 8px rgba(139,80,40,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 64px rgba(139,80,40,0.15), 0 8px 24px rgba(139,80,40,0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(198,139,89,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(139,80,40,0.06), 0 2px 8px rgba(139,80,40,0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(198,139,89,0.2)";
                  }}
                >


                  {/* ── Realistic Plate with Shadow ── */}
                  {item.image && (
                    <div className="relative mb-6 flex items-center justify-center" style={{ width: "180px", height: "180px" }}>
                      {/* Ambient contact shadow under the plate */}
                      <div
                        className="absolute pointer-events-none rounded-full"
                        style={{
                          bottom: "4px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "140px",
                          height: "24px",
                          background: "radial-gradient(ellipse at center, rgba(11,32,59,0.3) 0%, rgba(139,80,40,0.18) 40%, transparent 75%)",
                          filter: "blur(8px)",
                        }}
                      />

                      {/* Plate Image with realistic drop shadow */}
                      <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 160px, 180px"
                          className="object-contain"
                          style={{
                            filter: "drop-shadow(0 14px 22px rgba(11, 32, 59, 0.22)) drop-shadow(0 4px 10px rgba(139, 80, 40, 0.16))",
                          }}
                        />
                      </div>

                    </div>
                  )}

                  {/* Dish Details: Name -> Price -> Description */}
                  <div className="flex-1 w-full flex flex-col space-y-2">
                    <h3
                      className="font-sans transition-colors duration-300 group-hover:text-[#C68B59]"
                      style={{
                        fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                        color: "#0B203B",
                        lineHeight: 1.25,
                      }}
                    >
                      {item.name}
                    </h3>

                    {/* Price */}
                    <div>
                      <span
                        className="font-sans font-normal tracking-wide"
                        style={{
                          fontSize: "1.35rem",
                          color: "#0084D1",
                        }}
                      >
                        {item.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "rgba(11,32,59,0.6)",
                        lineHeight: 1.55,
                        maxWidth: "220px",
                        margin: "0 auto",
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>


                </div>
              );
            })}
          </div>
        ) : (
          /* ================================================================= */
          /* LIST VIEW — Elegant Boho Tasting Menu Scroll                      */
          /* ================================================================= */
          <div
            className="rounded-[2rem] overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(198,139,89,0.2)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 40px rgba(139,80,40,0.07)",
            }}
          >
            {displayedSections.map((section, sIdx) => (
              <div key={section.id}>
                {/* Section Header */}
                <div
                  className="px-8 sm:px-12 py-5 flex items-center justify-between"
                  style={{
                    background:
                      sIdx % 2 === 0
                        ? "rgba(198,139,89,0.06)"
                        : "rgba(0,132,209,0.04)",
                    borderBottom: "1px solid rgba(198,139,89,0.12)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <h3
                      className="font-sans"
                      style={{
                        fontSize: "clamp(1.4rem, 3vw, 2rem)",
                        color: "#0B203B",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {section.title}
                    </h3>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y" style={{ borderColor: "rgba(198,139,89,0.1)" }}>
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center gap-5 px-8 sm:px-12 py-5 transition-all duration-200"
                      style={{ borderBottom: "1px solid rgba(198,139,89,0.08)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(198,139,89,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className="font-sans transition-colors duration-200 group-hover:text-[#C68B59]"
                          style={{
                            fontSize: "clamp(1rem, 2vw, 1.3rem)",
                            color: "#0B203B",
                            lineHeight: 1.3,
                          }}
                        >
                          {item.name}
                        </h4>
                        <p
                          style={{
                            fontSize: "0.82rem",
                            color: "rgba(11,32,59,0.55)",
                            lineHeight: 1.5,
                            marginTop: "2px",
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontWeight: 300,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="flex items-center shrink-0">
                        <span
                          className="font-sans"
                          style={{
                            fontSize: "1.4rem",
                            color: "#0084D1",
                          }}
                        >
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}


      </div>


    </div>
  );
}

