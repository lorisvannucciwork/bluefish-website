"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Utensils,
  Plus,
  Minus,
  Trash2,
  ChevronDown,
  X,
  Clock,
  MapPin,
  Check,
  Copy,
  Phone,
  ArrowRight,
  Sparkles,
  Hotel,
  Sailboat,
  Home,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { menuSectionsData, menuCategories } from "@/data/menuData";
import { SkeletonOverlay, useImageLoaded } from "@/components/ui/ImageSkeleton";
import {
  DELIVERY_PHONE,
  DELIVERY_PHONE_INTL,
  DELIVERY_WHATSAPP_CLEAN,
} from "@/data/deliveryData";

// ─── CART TYPES ─────────────────────────────────────────────────────────────
export interface CartItem {
  name: string;
  price: string;
  unitPrice: number;
  category: string;
  image?: string;
  quantity: number;
  note?: string;
}

interface OrderForm {
  fullName: string;
  phone: string;
  destinationType: "resort" | "yacht" | "residence" | "pickup";
  destinationDetails: string;
  deliveryTime: "asap" | "scheduled";
  scheduledTime: string;
  specialNotes: string;
  paymentMethod: "cash" | "card";
}

// ─── HELPER: Parse Price string like "€8.50" to number 8.5 ──────────────────
function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  const match = priceStr.match(/[\d.]+/);
  if (!match) return 0;
  const num = parseFloat(match[0]);
  return isNaN(num) ? 0 : num;
}

// ─── Visual Dish Thumbnail Component ─────────────────────────────────────────
function DeliveryDishVisual({ src, alt }: { src?: string; alt: string }) {
  const { loaded, onLoad, onError, setNode } = useImageLoaded();
  const isPng = src?.endsWith(".png");

  if (!src) return null;

  return (
    <div
      className="relative w-full aspect-[4/3] rounded-[1.3rem] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #F8F3EC 0%, #EDE6DC 100%)",
        border: "1px solid rgba(198, 139, 89, 0.25)",
      }}
    >
      <SkeletonOverlay loaded={loaded} className="rounded-[1.3rem]" />
      <Image
        ref={setNode}
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`transition-all duration-700 ease-out group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${isPng ? "object-contain p-3" : "object-cover"}`}
        onLoad={onLoad}
        onError={onError}
      />
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

export default function DeliveryExperience() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cart & Drawer State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingNoteFor, setEditingNoteFor] = useState<string | null>(null);
  const [itemNoteInput, setItemNoteInput] = useState("");
  const [copiedText, setCopiedText] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ fullName?: boolean; destination?: boolean }>({});

  // Checkout Form State
  const [form, setForm] = useState<OrderForm>({
    fullName: "",
    phone: "",
    destinationType: "resort",
    destinationDetails: "",
    deliveryTime: "asap",
    scheduledTime: "19:00",
    specialNotes: "",
    paymentMethod: "cash",
  });

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Body scroll lock when cart drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Group displayed sections by activeCategory and search query
  const displayedSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return menuSectionsData
      .filter((sec) => activeCategory === "all" || sec.categoryId === activeCategory)
      .map((sec) => {
        const matchingItems = sec.items.filter((item) => {
          if (!q) return true;
          return (
            item.name.toLowerCase().includes(q) ||
            (item.desc && item.desc.toLowerCase().includes(q)) ||
            sec.title.toLowerCase().includes(q)
          );
        });

        return {
          ...sec,
          items: matchingItems.map((item) => ({
            ...item,
            sectionTitle: sec.title,
            unitPrice: parsePrice(item.price),
          })),
        };
      })
      .filter((sec) => sec.items.length > 0);
  }, [activeCategory, searchQuery]);

  const totalFilteredCount = useMemo(() => {
    return displayedSections.reduce((sum, sec) => sum + sec.items.length, 0);
  }, [displayedSections]);

  // Cart operations
  const addToCart = (item: { name: string; price: string; category: string; image?: string; unitPrice: number }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          name: item.name,
          price: item.price,
          unitPrice: item.unitPrice,
          category: item.category,
          image: item.image,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.name === name) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeItem = (name: string) => {
    setCart((prev) => prev.filter((i) => i.name !== name));
  };

  const getItemQuantity = (name: string) => {
    return cart.find((i) => i.name === name)?.quantity || 0;
  };

  const saveItemNote = (name: string) => {
    setCart((prev) =>
      prev.map((i) => (i.name === name ? { ...i, note: itemNoteInput.trim() } : i))
    );
    setEditingNoteFor(null);
    setItemNoteInput("");
  };

  // Calculations
  const totalItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [cart]);

  // WhatsApp Message Generator
  const generateWhatsAppMessage = () => {
    const destinationLabels: Record<string, string> = {
      resort: "Hotel / Resort",
      yacht: "Marina Yacht / Mooring Berth",
      residence: "Private Villa / Apartment",
      pickup: "Marina Takeaway Pickup",
    };

    const paymentLabels: Record<string, string> = {
      cash: "Cash on Delivery",
      card: "Card Machine on Delivery",
    };

    let msg = `🌊 *BLUE FISH PORT GHALIB - DELIVERY ORDER* 🌊\n`;
    msg += `═════════════════════════════\n`;
    msg += `👤 *Customer Name:* ${form.fullName || "Guest"}\n`;
    msg += `📞 *WhatsApp / Phone:* ${form.phone || "Not specified"}\n`;
    msg += `📍 *Delivery Zone:* ${destinationLabels[form.destinationType]}\n`;
    msg += `🏨 *Destination Details:* ${form.destinationDetails || "Please ask guest"}\n`;
    msg += `⏰ *Delivery Timing:* ${
      form.deliveryTime === "asap"
        ? "ASAP (30-45 minutes)"
        : `Scheduled for: ${form.scheduledTime}`
    }\n`;
    msg += `💳 *Payment Method:* ${paymentLabels[form.paymentMethod]}\n`;
    msg += `═════════════════════════════\n`;
    msg += `📋 *ORDER ITEMS:*\n`;

    cart.forEach((item, idx) => {
      const lineTotal = (item.unitPrice * item.quantity).toFixed(2);
      msg += `${idx + 1}. *${item.quantity}x ${item.name}* (€${item.unitPrice.toFixed(2)}) = €${lineTotal}\n`;
      if (item.note) {
        msg += `   ↳ _Note: ${item.note}_\n`;
      }
    });

    msg += `═════════════════════════════\n`;
    msg += `🍱 *Total Dishes:* ${totalItemsCount}\n`;
    msg += `💰 *Subtotal:* €${subtotal.toFixed(2)}\n`;
    msg += `🚚 *Delivery to Port Ghalib:* Complementary\n`;
    msg += `🧾 *Estimated Total:* €${subtotal.toFixed(2)}\n`;
    msg += `═════════════════════════════\n`;

    if (form.specialNotes && form.specialNotes.trim()) {
      msg += `📝 *Special Requests / Cutlery:*\n${form.specialNotes.trim()}\n`;
      msg += `═════════════════════════════\n`;
    }

    msg += `_Sent via Blue Fish Online Delivery Portal_`;
    return msg;
  };

  const handleCheckoutWhatsApp = () => {
    const errors: { fullName?: boolean; destination?: boolean } = {};
    if (!form.fullName.trim()) errors.fullName = true;
    if (!form.destinationDetails.trim()) errors.destination = true;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    const message = generateWhatsAppMessage();
    setSubmittedOrder(message);

    const waUrl = `https://wa.me/${DELIVERY_WHATSAPP_CLEAN}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const copyOrderText = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  return (
    <div
      id="delivery-menu"
      className="relative overflow-hidden font-sans"
      style={{ background: "#F5EFE7" }}
    >
      {/* Subtle organic radial blooms */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "5%",
          left: "-120px",
          width: "600px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(198,139,89,0.16) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "45%",
          right: "-100px",
          width: "550px",
          height: "550px",
          background: "radial-gradient(ellipse, rgba(0,132,209,0.12) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 space-y-12">
        {/* ================================================================= */}
        {/* 1. FILTER CONTROLS — CATEGORIES + SEARCH                          */}
        {/* ================================================================= */}
        <div className="space-y-4">
          <div
            className="p-2 sm:p-2.5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(198,139,89,0.25)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 20px rgba(139,80,40,0.05)",
            }}
          >
            {/* Left: Category Dropdown */}
            <div className="relative w-full md:w-auto" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="w-full md:w-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300"
                style={{
                  background: isDropdownOpen ? "#FFFFFF" : "rgba(255,255,255,0.9)",
                  border: isDropdownOpen ? "1px solid #C68B59" : "1px solid rgba(198,139,89,0.3)",
                  boxShadow: isDropdownOpen ? "0 4px 18px rgba(198,139,89,0.25)" : "none",
                }}
              >
                <span className="text-sm sm:text-base font-semibold text-[#4c6f92]">
                  {activeCategory === "all"
                    ? "All Dishes & Platters"
                    : menuCategories.find((c) => c.id === activeCategory)?.name || "Category"}
                </span>
                <ChevronDown
                  className="w-4 h-4 text-[#4c6f92] transition-transform duration-300 shrink-0"
                  style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute left-0 top-[calc(100%+8px)] w-full md:w-80 rounded-2xl p-2 z-50 transition-all duration-200"
                  style={{
                    background: "#FFFDF9",
                    border: "1px solid rgba(198,139,89,0.35)",
                    boxShadow: "0 18px 45px rgba(11,32,59,0.2), 0 4px 14px rgba(139,80,40,0.1)",
                  }}
                >
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory("all");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition-colors cursor-pointer"
                      style={{
                        background: activeCategory === "all" ? "#FAF5ED" : "transparent",
                        color: activeCategory === "all" ? "#C68B59" : "#4c6f92",
                        fontWeight: activeCategory === "all" ? 600 : 400,
                      }}
                    >
                      <span>All Dishes & Platters</span>
                      {activeCategory === "all" && <Check className="w-4 h-4 text-[#C68B59]" />}
                    </button>

                    {menuCategories.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setActiveCategory(cat.id);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition-colors cursor-pointer"
                          style={{
                            background: isActive ? "#FAF5ED" : "transparent",
                            color: isActive ? "#C68B59" : "#4c6f92",
                            fontWeight: isActive ? 600 : 400,
                          }}
                        >
                          <span>{cat.name}</span>
                          {isActive && <Check className="w-4 h-4 text-[#C68B59]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Live Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#4c6f92]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter dish name or ingredients here..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm text-[#0B203B] placeholder-[#4c6f92]/50 focus:outline-none transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  border: "1px solid rgba(198,139,89,0.3)",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4c6f92]/60 hover:text-[#0B203B]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Active filter indication */}
          <div className="flex items-center justify-between text-xs text-[#4c6f92]/80 px-2">
            <span>
              Showing <strong>{totalFilteredCount}</strong> available delivery dishes
            </span>
            {cart.length > 0 && (
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="font-semibold text-[#0084D1] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>
                  {totalItemsCount} item{totalItemsCount > 1 ? "s" : ""} in bag (€{subtotal.toFixed(2)})
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. MENU DISHES DISPLAY — Grouped by Category & Section           */}
        {/* ================================================================= */}
        {totalFilteredCount === 0 ? (
          <div
            className="text-center py-16 rounded-3xl space-y-4"
            style={{
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(198,139,89,0.2)",
            }}
          >
            <p className="text-xl sm:text-2xl text-[#4c6f92]">No dishes matched your search.</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full text-white text-sm transition-all duration-300 cursor-pointer"
              style={{ background: "#4c6f92" }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {displayedSections.map((section) => (
              <div key={section.id} className="space-y-8">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C68B59]/25 pb-4">
                  <div>
                    <h3
                      className="text-2xl sm:text-3xl lg:text-4xl tracking-wide text-[#4c6f92]"
                      style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
                    >
                      {section.title}
                    </h3>
                    {section.subtitle && (
                      <p
                        className="text-sm italic mt-1 text-[#4c6f92]/80"
                        style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
                      >
                        {section.subtitle}
                      </p>
                    )}
                  </div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#C68B59]">
                    {section.items.length} {section.items.length === 1 ? "dish" : "dishes"}
                  </span>
                </div>

                {/* Dishes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {section.items.map((item, idx) => {
                    const qty = getItemQuantity(item.name);
                    const inCart = qty > 0;

                    return (
                      <div
                        key={`${item.name}-${idx}`}
                        className="group relative flex flex-col justify-between transition-all duration-500 rounded-[2rem] overflow-hidden"
                        style={{
                          background: inCart
                            ? "linear-gradient(165deg, #FFFFFF 0%, #FBF6EE 100%)"
                            : "linear-gradient(165deg, #FFFFFF 0%, #FDFBF7 60%, #FAF5ED 100%)",
                          border: inCart
                            ? "1.5px solid rgba(198,139,89,0.6)"
                            : "1px solid rgba(198,139,89,0.22)",
                          boxShadow: inCart
                            ? "0 14px 35px -10px rgba(198,139,89,0.18)"
                            : "0 10px 30px -10px rgba(11,32,59,0.07)",
                          padding: item.image ? "0.875rem" : "1.75rem 1.5rem",
                        }}
                      >
                        {/* Top visual image */}
                        {item.image && <DeliveryDishVisual src={item.image} alt={item.name} />}

                        {/* Dish Details */}
                        <div
                          className={`flex flex-col justify-between flex-1 ${
                            item.image ? "p-3 sm:p-4 pt-3" : "p-0"
                          }`}
                        >
                          <div>
                            {/* Name & Price */}
                            <div className="flex items-start justify-between gap-3">
                              <h4
                                className="text-xl sm:text-2xl font-normal tracking-wide text-[#4c6f92] group-hover:text-[#C68B59] transition-colors leading-snug"
                                style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
                              >
                                {item.name}
                              </h4>
                              <span
                                className="shrink-0 font-medium text-lg sm:text-xl text-[#4c6f92] tracking-tight"
                                style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
                              >
                                {item.price}
                              </span>
                            </div>

                            {/* Golden accent bar */}
                            <div
                              className="w-7 h-[1.5px] rounded-full my-2.5 transition-all duration-500 group-hover:w-12"
                              style={{ background: "rgba(198,139,89,0.35)" }}
                            />

                            {/* Description */}
                            {item.desc && (
                              <p className="text-xs sm:text-sm font-light text-[#4c6f92]/80 leading-relaxed line-clamp-2 lowercase mb-3">
                                {item.desc}
                              </p>
                            )}
                          </div>

                          {/* Bottom Action: Add to Bag or Quantity Controller */}
                          <div className="pt-3 border-t border-[#C68B59]/15 flex items-center justify-between gap-2">
                            <span className="text-[11px] uppercase tracking-wider text-[#C68B59] font-medium">
                              {section.title}
                            </span>

                            {qty === 0 ? (
                              <button
                                type="button"
                                onClick={() => addToCart(item)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-sm"
                                style={{
                                  background: "linear-gradient(135deg, #0084D1 0%, #006AA8 100%)",
                                  color: "#FFFFFF",
                                }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                }}
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add to Bag</span>
                              </button>
                            ) : (
                              <div
                                className="flex items-center gap-2 px-2 py-1 rounded-full"
                                style={{
                                  background: "#FAF4EC",
                                  border: "1px solid rgba(198,139,89,0.5)",
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.name, -1)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#4c6f92] hover:bg-[#C68B59] hover:text-white transition-colors cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-semibold text-sm text-[#0B203B] px-1 min-w-[20px] text-center">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.name, 1)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#4c6f92] hover:bg-[#C68B59] hover:text-white transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* 3. FLOATING BOTTOM BAG BAR (Appears when items are in bag)         */}
      {/* ================================================================= */}
      {cart.length > 0 && !isDrawerOpen && (
        <aside
          aria-label="Delivery bag preview"
          className="fixed bottom-5 inset-x-4 sm:inset-x-auto sm:right-8 sm:w-auto z-40 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="w-full sm:w-auto flex items-center justify-between gap-5 sm:gap-7 px-6 py-3.5 rounded-full shadow-2xl cursor-pointer transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #FFFDF9 60%, #FAF4EB 100%)",
              border: "2px solid #C68B59",
              boxShadow: "0 14px 40px rgba(198,139,89,0.28), 0 4px 16px rgba(11,32,59,0.06)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 20px 45px rgba(198,139,89,0.4), 0 6px 20px rgba(11,32,59,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 14px 40px rgba(198,139,89,0.28), 0 4px 16px rgba(11,32,59,0.06)";
            }}
          >
            <div className="flex items-center gap-3.5">
              <span
                className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-xs shrink-0"
                style={{ background: "linear-gradient(135deg, #C68B59 0%, #B07442 100%)" }}
              >
                {totalItemsCount}
              </span>
              <div className="text-left">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-[#C68B59]">
                  Delivery Bag
                </p>
                <p className="text-sm sm:text-base font-bold text-[#0B203B]">
                  {totalItemsCount} item{totalItemsCount > 1 ? "s" : ""} • €{subtotal.toFixed(2)}
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white px-5 py-2.5 rounded-full shadow-sm transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0084D1 0%, #006AA8 100%)",
              }}
            >
              <span>Checkout Order</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </aside>
      )}

      {/* ================================================================= */}
      {/* 4. SLIDE-OVER CHECKOUT DRAWER / MODAL                            */}
      {/* ================================================================= */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Container */}
          <div
            className="relative w-full max-w-xl bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-50 overflow-hidden"
            style={{ borderLeft: "1px solid rgba(198,139,89,0.3)" }}
          >
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 bg-white border-b border-[#C68B59]/20 flex items-center justify-between">
              <div>
                <h3
                  className="text-xl sm:text-2xl text-[#0B203B]"
                  style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
                >
                  Your Delivery Order
                </h3>
                <p className="text-xs text-[#4c6f92]">
                  {totalItemsCount} dish{totalItemsCount > 1 ? "es" : ""} • WhatsApp checkout
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0B203B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-8">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <Utensils className="w-12 h-12 text-[#C68B59]/50 mx-auto" />
                  <p className="text-lg text-[#4c6f92]">Your delivery bag is currently empty.</p>
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-6 py-2.5 rounded-full text-white text-sm cursor-pointer"
                    style={{ background: "#0B203B" }}
                  >
                    Browse Menu Dishes
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs uppercase tracking-widest font-semibold text-[#C68B59]">
                        Selected Dishes
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCart([])}
                        className="text-xs text-rose-600 hover:underline cursor-pointer"
                      >
                        Clear Bag
                      </button>
                    </div>

                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.name}
                          className="p-3.5 rounded-2xl bg-white border border-[#C68B59]/20 space-y-2 shadow-xs"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-xl object-cover border border-[#C68B59]/20 shrink-0"
                                />
                              )}
                              <div>
                                <h5 className="font-semibold text-sm sm:text-base text-[#0B203B]">
                                  {item.name}
                                </h5>
                                <p className="text-xs text-[#4c6f92]">
                                  €{item.unitPrice.toFixed(2)} each
                                </p>
                              </div>
                            </div>

                            <span className="font-semibold text-sm text-[#0B203B]">
                              €{(item.unitPrice * item.quantity).toFixed(2)}
                            </span>
                          </div>

                          {/* Item Note Display */}
                          {item.note && (
                            <p className="text-xs text-[#0084D1] bg-[#0084D1]/10 px-2.5 py-1 rounded-lg">
                              Note: {item.note}
                            </p>
                          )}

                          {/* Bottom controls */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            {editingNoteFor === item.name ? (
                              <div className="flex items-center gap-2 w-full pt-1">
                                <input
                                  type="text"
                                  value={itemNoteInput}
                                  onChange={(e) => setItemNoteInput(e.target.value)}
                                  placeholder="Enter specific instructions for this dish here..."
                                  className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-[#C68B59]/30 focus:outline-none bg-[#FAF7F2]"
                                />
                                <button
                                  type="button"
                                  onClick={() => saveItemNote(item.name)}
                                  className="px-2.5 py-1.5 rounded-lg bg-[#C68B59] text-white text-xs font-medium cursor-pointer"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingNoteFor(null)}
                                  className="text-xs text-slate-400 hover:text-slate-600"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingNoteFor(item.name);
                                    setItemNoteInput(item.note || "");
                                  }}
                                  className="text-[11px] text-[#4c6f92] hover:text-[#C68B59] flex items-center gap-1 cursor-pointer"
                                >
                                  <FileText className="w-3 h-3" />
                                  <span>{item.note ? "Edit note" : "+ Add dish note"}</span>
                                </button>

                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#C68B59]/30 rounded-lg p-0.5">
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(item.name, -1)}
                                      className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-[#C68B59] cursor-pointer"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="text-xs font-semibold px-1.5 text-[#0B203B]">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(item.name, 1)}
                                      className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-[#C68B59] cursor-pointer"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => removeItem(item.name)}
                                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                                    title="Remove item"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer & Delivery Form */}
                  <div className="space-y-4 pt-4 border-t border-[#C68B59]/20">
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-[#C68B59]">
                      Delivery Destination & Contact
                    </h4>

                    {/* Full Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#0B203B]">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          placeholder="Enter your full name here..."
                          className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border transition-colors focus:outline-none ${
                            formErrors.fullName
                              ? "border-rose-500 ring-1 ring-rose-500"
                              : "border-[#C68B59]/30"
                          }`}
                        />
                        {formErrors.fullName && (
                          <p className="text-[11px] text-rose-500">Please provide your name.</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#0B203B]">
                          WhatsApp / Phone
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="Enter your phone or WhatsApp number here..."
                          className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border border-[#C68B59]/30 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Destination Type Selectors */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#0B203B]">Location Type</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: "resort" as const, label: "Resort / Hotel", Icon: Hotel },
                          { id: "yacht" as const, label: "Yacht / Boat", Icon: Sailboat },
                          { id: "residence" as const, label: "Private Villa", Icon: Home },
                          { id: "pickup" as const, label: "Marina Pickup", Icon: Utensils },
                        ].map(({ id, label, Icon }) => {
                          const isSelected = form.destinationType === id;
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => setForm({ ...form, destinationType: id })}
                              className="p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer"
                              style={{
                                background: isSelected ? "#0B203B" : "#FFFFFF",
                                color: isSelected ? "#FAF6F0" : "#4c6f92",
                                border: isSelected
                                  ? "1px solid #0B203B"
                                  : "1px solid rgba(198,139,89,0.3)",
                              }}
                            >
                              <Icon
                                className="w-4 h-4"
                                style={{ color: isSelected ? "#C68B59" : "currentColor" }}
                              />
                              <span className="text-[11px] font-medium leading-tight">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Specific Location Details */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#0B203B]">
                        {form.destinationType === "resort"
                          ? "Resort Name & Room Number *"
                          : form.destinationType === "yacht"
                          ? "Boat Name & Pier / Berth # *"
                          : form.destinationType === "residence"
                          ? "Villa Number / Street Address *"
                          : "Estimated Pickup Time *"}
                      </label>
                      <input
                        type="text"
                        value={form.destinationDetails}
                        onChange={(e) => setForm({ ...form, destinationDetails: e.target.value })}
                        placeholder={
                          form.destinationType === "resort"
                            ? "Enter your resort name and room number here..."
                            : form.destinationType === "yacht"
                            ? "Enter your boat name and pier or berth number here..."
                            : form.destinationType === "residence"
                            ? "Enter your villa or apartment address here..."
                            : "Enter your estimated pickup time here..."
                        }
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border transition-colors focus:outline-none ${
                          formErrors.destination
                            ? "border-rose-500 ring-1 ring-rose-500"
                            : "border-[#C68B59]/30"
                        }`}
                      />
                      {formErrors.destination && (
                        <p className="text-[11px] text-rose-500">
                          Please provide your resort room, yacht berth, or address.
                        </p>
                      )}
                    </div>

                    {/* Timing & Payment Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#0B203B]">Delivery Time</label>
                        <select
                          value={form.deliveryTime}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              deliveryTime: e.target.value as "asap" | "scheduled",
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-[#C68B59]/30 focus:outline-none cursor-pointer"
                        >
                          <option value="asap">ASAP (30–45 mins)</option>
                          <option value="scheduled">Schedule for later today</option>
                        </select>
                      </div>

                      {form.deliveryTime === "scheduled" ? (
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-[#0B203B]">
                            Select Time
                          </label>
                          <input
                            type="time"
                            value={form.scheduledTime}
                            onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-[#C68B59]/30 focus:outline-none"
                          />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-[#0B203B]">
                            Payment on Arrival
                          </label>
                          <select
                            value={form.paymentMethod}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                paymentMethod: e.target.value as "cash" | "card",
                              })
                            }
                            className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-[#C68B59]/30 focus:outline-none cursor-pointer"
                          >
                            <option value="cash">Cash (EGP, EUR, USD)</option>
                            <option value="card">Card Machine (Visa/Mastercard)</option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Special requests */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#0B203B]">
                        Special Requests / Cutlery & Allergies
                      </label>
                      <textarea
                        rows={2}
                        value={form.specialNotes}
                        onChange={(e) => setForm({ ...form, specialNotes: e.target.value })}
                        placeholder="Enter any special requests, allergies, or cutlery notes here..."
                        className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-white border border-[#C68B59]/30 focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Bill Summary */}
                  <div
                    className="p-4 rounded-2xl space-y-2 border border-[#C68B59]/25"
                    style={{ background: "#FAF4EC" }}
                  >
                    <div className="flex items-center justify-between text-xs text-[#4c6f92]">
                      <span>Dishes Subtotal ({totalItemsCount} items)</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#4c6f92]">
                      <span>Port Ghalib Thermal Delivery</span>
                      <span className="text-emerald-600 font-medium">Complementary</span>
                    </div>
                    <div className="pt-2 border-t border-[#C68B59]/20 flex items-center justify-between text-base font-semibold text-[#0B203B]">
                      <span>Total Estimated</span>
                      <span className="text-[#C68B59]">€{subtotal.toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 pt-1 leading-tight">
                      Prices include all taxes; subject to standard 12% service charge. Payment collected upon arrival.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer CTA */}
            {cart.length > 0 && (
              <div className="p-5 bg-white border-t border-[#C68B59]/20 space-y-3">
                <button
                  type="button"
                  onClick={handleCheckoutWhatsApp}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-semibold text-base transition-all duration-300 shadow-xl cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #25D366 0%, #1EBE5D 100%)",
                    boxShadow: "0 8px 25px rgba(37,211,102,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <span>Send Order via WhatsApp ({DELIVERY_PHONE})</span>
                </button>

                <div className="flex items-center justify-between text-xs text-[#4c6f92]">
                  <button
                    type="button"
                    onClick={copyOrderText}
                    className="inline-flex items-center gap-1 hover:text-[#0B203B] transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedText ? "Order Copied to Clipboard!" : "Copy Order Summary"}</span>
                  </button>

                  <a
                    href={`tel:${DELIVERY_PHONE_INTL.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-1 hover:text-[#C68B59] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Hotline</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
