"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  List,
  ChevronDown,
  Check,
} from "lucide-react";
import { menuSectionsData, menuCategories, POLICY_NOTE } from "@/data/menuData";
import { SkeletonOverlay, useImageLoaded } from "@/components/ui/ImageSkeleton";

function CatalogDishVisual({
  src,
  alt,
}: {
  src?: string;
  alt: string;
}) {
  const { loaded, onLoad, onError, setNode } = useImageLoaded();
  const isPng = src?.endsWith(".png");

  if (!src) return null;

  return (
    <div
      className="relative w-full aspect-[4/3] rounded-[1.4rem] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #F8F3EC 0%, #EDE6DC 100%)",
        border: "1px solid rgba(198, 139, 89, 0.25)",
        boxShadow: "inset 0 2px 6px rgba(11,32,59,0.04)",
      }}
    >
      <SkeletonOverlay loaded={loaded} className="rounded-[1.4rem]" />
      <Image
        ref={setNode}
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`transition-all duration-700 ease-out group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${isPng ? "object-contain p-4" : "object-cover"}`}
        style={
          isPng
            ? {
                filter:
                  "drop-shadow(0 14px 20px rgba(11, 32, 59, 0.2)) drop-shadow(0 4px 8px rgba(139, 80, 40, 0.14))",
              }
            : undefined
        }
        onLoad={onLoad}
        onError={onError}
      />

      {/* Gentle gradient wash on bottom edge for seamless integration */}
      {!isPng && (
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none opacity-35 group-hover:opacity-15 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(11, 32, 59, 0.4) 0%, transparent 100%)",
          }}
        />
      )}
    </div>
  );
}

// ─── CATEGORY ACCENT COLOR MAP ──────────────────────────────────────────────
const catAccent: Record<string, string> = {
  all: "#C68B59",
  "starters-bowls": "#E08050",
  "sushi-classics": "#C05A7A",
  "rolls-combos": "#0084D1",
  "mains-desserts": "#5A9E6E",
  "beverages-wine": "#C68B59",
  "cocktails-shoots": "#8B5E9C",
};

export default function MenuCatalog() {
  const [activeCategory, setActiveCategory] = useState("starters-bowls");
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

  const displayedSections = useMemo(() => {
    return menuSectionsData.filter((sec) => sec.categoryId === activeCategory);
  }, [activeCategory]);

  const filteredItems = useMemo(() => {
    return displayedSections.flatMap((sec) => sec.items);
  }, [displayedSections]);

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
                  className="absolute left-0 top-[calc(100%+8px)] w-72 sm:w-80 rounded-2xl p-2 z-50 transition-all duration-200"
                  style={{
                    background: "#FFFDF9",
                    border: "1px solid rgba(198,139,89,0.35)",
                    boxShadow:
                      "0 18px 45px rgba(11,32,59,0.2), 0 4px 14px rgba(139,80,40,0.1)",
                  }}
                >
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
                          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer"
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
                            className="font-sans text-sm sm:text-base truncate"
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
                                width: "15px",
                                height: "15px",
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
              onClick={() => setActiveCategory("starters-bowls")}
              className="px-7 py-3 rounded-full font-sans text-base transition-all duration-300 cursor-pointer"
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
          /* BOHO COASTAL GRID — Grouped by Sub-Sections                       */
          /* ================================================================= */
          <div className="space-y-16">
            {displayedSections.map((section) => (
              <div key={section.id} className="space-y-8">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C68B59]/25 pb-4">
                  <div>
                    <h3
                      className="font-sans text-2xl sm:text-3xl lg:text-4xl tracking-wide"
                      style={{ color: "#0B203B" }}
                    >
                      {section.title}
                    </h3>
                    {section.subtitle && (
                      <p
                        className="text-sm text-[#0B203B]/65 italic mt-1"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        {section.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group relative flex flex-col justify-between transition-all duration-500 rounded-[2rem] overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(165deg, #FFFFFF 0%, #FDFBF7 60%, #FAF5ED 100%)",
                        border: "1px solid rgba(198,139,89,0.22)",
                        boxShadow:
                          "0 10px 30px -10px rgba(11,32,59,0.07), 0 2px 6px rgba(198,139,89,0.03)",
                        padding: item.image ? "0.875rem" : "1.75rem 1.5rem",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 24px 50px -12px rgba(11,32,59,0.16), 0 0 0 1px rgba(198,139,89,0.45)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 10px 30px -10px rgba(11,32,59,0.07), 0 2px 6px rgba(198,139,89,0.03)";
                      }}
                    >
                      {/* Top: Visual Image Showcase (only if image exists) */}
                      {item.image && (
                        <CatalogDishVisual
                          src={item.image}
                          alt={item.name}
                        />
                      )}

                      {/* Bottom: Dish Content */}
                      <div className={`flex flex-col justify-between flex-1 ${item.image ? "p-4 sm:p-5 pt-4" : "p-0"}`}>
                        <div>
                          {/* Title & Price Header */}
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-sans text-xl sm:text-2xl font-normal tracking-tight text-[#0B203B] group-hover:text-[#C68B59] transition-colors duration-300 leading-snug">
                              {item.name}
                            </h4>
                            <span className="shrink-0 font-sans font-medium text-lg sm:text-xl text-[#0084D1] tracking-tight">
                              {item.price}
                            </span>
                          </div>

                          {/* Delicate Golden Accent Line */}
                          <div
                            className="w-7 h-[1.5px] rounded-full my-3 transition-all duration-500 group-hover:w-14"
                            style={{ background: "rgba(198,139,89,0.35)" }}
                          />

                          {/* Description */}
                          {item.desc && (
                            <p
                              className="text-xs sm:text-sm text-[#0B203B]/65 font-light leading-relaxed line-clamp-2 group-hover:text-[#0B203B]/80 transition-colors"
                              style={{
                                fontFamily: "var(--font-montserrat), sans-serif",
                                fontWeight: 300,
                              }}
                            >
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
                    <div>
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
                      {section.subtitle && (
                        <p
                          className="text-xs sm:text-sm text-[#0B203B]/65 italic mt-0.5"
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                          {section.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y" style={{ borderColor: "rgba(198,139,89,0.1)" }}>
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center justify-between gap-5 px-6 sm:px-10 py-4 sm:py-5 transition-all duration-300"
                      style={{ borderBottom: "1px solid rgba(198,139,89,0.08)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(198,139,89,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0 pr-4">
                        {/* Optional Thumbnail in List View */}
                        {item.image && (
                          <div
                            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-[#C68B59]/25 shadow-sm group-hover:border-[#C68B59] transition-all"
                            style={{ background: "#FAF6F0" }}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="80px"
                              className={`transition-transform duration-500 group-hover:scale-110 ${
                                item.image.endsWith(".png")
                                  ? "object-contain p-1.5"
                                  : "object-cover"
                              }`}
                            />
                          </div>
                        )}

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-sans transition-colors duration-200 group-hover:text-[#C68B59]"
                            style={{
                              fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
                              color: "#0B203B",
                              lineHeight: 1.3,
                            }}
                          >
                            {item.name}
                          </h4>
                          {item.desc && (
                            <p
                              style={{
                                fontSize: "0.82rem",
                                color: "rgba(11,32,59,0.6)",
                                lineHeight: 1.5,
                                marginTop: "3px",
                                fontFamily: "var(--font-montserrat), sans-serif",
                                fontWeight: 300,
                              }}
                            >
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className="font-sans font-medium"
                          style={{
                            fontSize: "1.35rem",
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

        {/* ================================================================= */}
        {/* 4. POLICY NOTE BANNER                                             */}
        {/* ================================================================= */}
        <div
          className="text-center py-6 px-6 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.45)",
            border: "1px solid rgba(198,139,89,0.2)",
            boxShadow: "0 4px 16px rgba(139,80,40,0.03)",
          }}
        >
          <p
            className="text-xs sm:text-sm text-[#0B203B]/70 italic tracking-wide"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            * Policy note: {POLICY_NOTE}
          </p>
        </div>
      </div>
    </div>
  );
}
