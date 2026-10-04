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
  Building2,
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
  destinationType: "resort" | "yacht" | "apartment" | "residence" | "outside" | "pickup";
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

// ─── HELPER: Text input sanitizer (removes control chars & caps length) ──────
function sanitizeText(val: string, maxLen: number): string {
  if (!val) return "";
  return val.replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g, "").trim().slice(0, maxLen);
}

// ─── HELPER: 12-Hour format converter for custom time picker ────────────────
function format12Hour(timeStr: string): string {
  if (!timeStr) return "7:00 PM";
  const [hStr, mStr] = timeStr.split(":");
  let hour = parseInt(hStr, 10);
  if (isNaN(hour)) hour = 19;
  const minute = mStr || "00";
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute} ${period}`;
}

function formatHourLabel(timeStr: string): string {
  if (!timeStr) return "7 PM";
  let hour = parseInt(timeStr.split(":")[0], 10);
  if (isNaN(hour)) hour = 19;
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour} ${period}`;
}

const OPENING_HOURS = [17, 18, 19, 20, 21, 22, 23, 0, 1];

const presetTimes = [
  { value: "17:30", label: "5:30 PM" },
  { value: "18:30", label: "6:30 PM" },
  { value: "19:30", label: "7:30 PM" },
  { value: "20:30", label: "8:30 PM" },
  { value: "21:30", label: "9:30 PM" },
  { value: "22:30", label: "10:30 PM" },
  { value: "23:30", label: "11:30 PM" },
  { value: "00:30", label: "12:30 AM" },
];

// ─── CART STORAGE & AUTO-RESET CONFIGURATION ────────────────────────────────
const CART_STORAGE_KEY = "bluefish_delivery_bag_v1";
// Auto-reset cart after 2 hours of inactivity or if date changes
const CART_EXPIRY_MS = 2 * 60 * 60 * 1000;

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
  const [showClearWarning, setShowClearWarning] = useState(false);
  const [isBarDismissed, setIsBarDismissed] = useState(false);

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

  // Custom UI dropdown states & refs
  const [isDeliveryTimeOpen, setIsDeliveryTimeOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const deliveryTimeRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  // Stepper handlers for custom time UI (5:00 PM – 1:00 AM)
  const adjustHour = (delta: number) => {
    let hour = parseInt(form.scheduledTime.split(":")[0], 10);
    if (isNaN(hour)) hour = 19;
    let minute = form.scheduledTime.split(":")[1] || "00";

    let idx = OPENING_HOURS.indexOf(hour);
    if (idx === -1) idx = 2; // fallback to 19 (7 PM)

    let newIdx = idx + delta;
    if (newIdx >= OPENING_HOURS.length) newIdx = 0;
    if (newIdx < 0) newIdx = OPENING_HOURS.length - 1;

    const newHour = OPENING_HOURS[newIdx];
    // If hour is 1 AM, cap minutes at 00
    if (newHour === 1 && parseInt(minute, 10) > 0) {
      minute = "00";
    }

    setForm((prev) => ({
      ...prev,
      scheduledTime: `${String(newHour).padStart(2, "0")}:${minute}`,
    }));
  };

  const adjustMinute = (delta: number) => {
    const hour = parseInt(form.scheduledTime.split(":")[0], 10);
    // If it's 1 AM, closing time is 01:00
    if (hour === 1) {
      setForm((prev) => ({ ...prev, scheduledTime: "01:00" }));
      return;
    }
    let minute = parseInt(form.scheduledTime.split(":")[1], 10);
    if (isNaN(minute)) minute = 0;
    let newMin = minute + delta;
    if (newMin >= 60) newMin = 0;
    if (newMin < 0) newMin = 45;
    setForm((prev) => ({
      ...prev,
      scheduledTime: `${String(isNaN(hour) ? 19 : hour).padStart(2, "0")}:${String(newMin).padStart(2, "0")}`,
    }));
  };

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
      if (deliveryTimeRef.current && !deliveryTimeRef.current.contains(target)) {
        setIsDeliveryTimeOpen(false);
      }
      if (paymentRef.current && !paymentRef.current.contains(target)) {
        setIsPaymentOpen(false);
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

  // ─── LOCALSTORAGE CART PERSISTENCE & AUTO-RESET ────────────────────────────
  const isCartHydratedRef = useRef(false);

  // Safe loader with auto-reset expiry check
  const loadCartFromStorage = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      const now = Date.now();
      const savedAt = typeof parsed?.savedAt === "number" ? parsed.savedAt : 0;

      // Auto-reset if older than 2 hours or saved on a different calendar day
      const isExpired =
        !savedAt ||
        now - savedAt > CART_EXPIRY_MS ||
        new Date(savedAt).toDateString() !== new Date(now).toDateString();

      if (isExpired) {
        localStorage.removeItem(CART_STORAGE_KEY);
        return [];
      }

      if (Array.isArray(parsed.items)) {
        return parsed.items
          .filter((i: unknown): i is CartItem => {
            if (!i || typeof i !== "object") return false;
            const item = i as Record<string, unknown>;
            const hasValidName = typeof item.name === "string" && item.name.trim().length > 0 && item.name.length <= 120;
            const hasValidPrice = typeof item.unitPrice === "number" && Number.isFinite(item.unitPrice) && item.unitPrice >= 0 && item.unitPrice <= 10000;
            const hasValidQty = typeof item.quantity === "number" && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99;
            const hasValidNote = item.note === undefined || (typeof item.note === "string" && item.note.length <= 200);
            return Boolean(hasValidName && hasValidPrice && hasValidQty && hasValidNote);
          })
          .map((item: CartItem) => ({
            ...item,
            name: sanitizeText(item.name, 120),
            note: item.note ? sanitizeText(item.note, 200) : undefined,
          }));
      }
    } catch {
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch {
        // ignore
      }
    }
    return [];
  };

  // Restore cart on client mount & sync across tabs or tab re-focus
  useEffect(() => {
    const saved = loadCartFromStorage();
    if (saved.length > 0) {
      setCart(saved);
    }
    isCartHydratedRef.current = true;

    // Auto-check expiry when user returns to tab
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        const fresh = loadCartFromStorage();
        setCart(fresh);
      }
    };

    // Cross-tab synchronization
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) {
        if (!e.newValue) {
          setCart([]);
        } else {
          const fresh = loadCartFromStorage();
          setCart(fresh);
        }
      }
    };

    window.addEventListener("focus", handleVisibilityOrFocus);
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("focus", handleVisibilityOrFocus);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Save cart to localStorage on state changes (updating savedAt timestamp)
  useEffect(() => {
    if (!isCartHydratedRef.current) return;
    try {
      if (cart.length === 0) {
        localStorage.removeItem(CART_STORAGE_KEY);
      } else {
        const payload = {
          items: cart,
          savedAt: Date.now(),
        };
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
      }
    } catch {
      // Ignore quota or private mode write errors
    }
  }, [cart]);

  // Clean reset function for bag
  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

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
    setIsBarDismissed(false);
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
      apartment: "Studio / Apartment (Port Ghalib)",
      residence: "Private Villa (Port Ghalib)",
      outside: "Outside Port Ghalib Area",
      pickup: "Marina Takeaway Pickup",
    };

    const paymentLabels: Record<string, string> = {
      cash: "Cash on Delivery",
      card: "Card Machine on Delivery",
    };

    const cleanName = sanitizeText(form.fullName, 60) || "Guest";
    const cleanPhone = sanitizeText(form.phone, 25) || "Not specified";
    const cleanDest = sanitizeText(form.destinationDetails, 150) || "Please ask guest";
    const cleanNotes = sanitizeText(form.specialNotes, 250);

    let msg = `🌊 *BLUE FISH PORT GHALIB - DELIVERY ORDER* 🌊\n`;
    msg += `═════════════════════════════\n`;
    msg += `👤 *Customer Name:* ${cleanName}\n`;
    msg += `📞 *WhatsApp / Phone:* ${cleanPhone}\n`;
    msg += `📍 *Delivery Zone:* ${destinationLabels[form.destinationType]}\n`;
    msg += `🏨 *Destination Details:* ${cleanDest}\n`;
    msg += `⏰ *Delivery Timing:* ${
      form.deliveryTime === "asap"
        ? "As fast as possible"
        : `Scheduled for: ${format12Hour(form.scheduledTime)} (${form.scheduledTime})`
    }\n`;
    msg += `💳 *Payment Method:* ${paymentLabels[form.paymentMethod]}\n`;
    msg += `═════════════════════════════\n`;
    msg += `📋 *ORDER ITEMS:*\n`;

    cart.forEach((item, idx) => {
      const lineTotal = (item.unitPrice * item.quantity).toFixed(2);
      const safeName = sanitizeText(item.name, 100);
      msg += `${idx + 1}. *${item.quantity}x ${safeName}* (€${item.unitPrice.toFixed(2)}) = €${lineTotal}\n`;
      if (item.note) {
        msg += `   ↳ _Note: ${sanitizeText(item.note, 120)}_\n`;
      }
    });

    msg += `═════════════════════════════\n`;
    msg += `🍱 *Total Dishes:* ${totalItemsCount}\n`;
    msg += `💰 *Subtotal:* €${subtotal.toFixed(2)}\n`;
    msg += `🚚 *Delivery to Port Ghalib:* Complementary\n`;
    msg += `🧾 *Estimated Total:* €${subtotal.toFixed(2)}\n`;
    msg += `═════════════════════════════\n`;

    if (cleanNotes) {
      msg += `📝 *Special Requests / Cutlery:*\n${cleanNotes}\n`;
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

    // Auto-reset delivery bag on order placement
    clearCart();

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
                maxLength={80}
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
        <>
          {isBarDismissed ? (
            <aside
              aria-label="Restore delivery bag"
              className="fixed bottom-5 right-4 sm:right-8 z-40 animate-in fade-in zoom-in-95 duration-200"
            >
              <button
                type="button"
                onClick={() => setIsBarDismissed(false)}
                className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-white shadow-2xl border border-slate-200/90 hover:border-[#C68B59]/50 text-[#0B203B] cursor-pointer transition-all hover:scale-105"
                title="Open Delivery Bag"
                aria-label="Open Delivery Bag"
              >
                <div className="relative">
                  <Utensils className="w-4 h-4 text-[#C68B59]" />
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-[#0084D1] text-white text-[10px] font-bold flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#0B203B]">
                  €{subtotal.toFixed(2)}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0084D1]" />
              </button>
            </aside>
          ) : (
            <aside
              aria-label="Delivery bag preview"
              className="fixed bottom-5 inset-x-4 sm:inset-x-auto sm:right-8 sm:w-auto z-40 animate-in fade-in slide-in-from-bottom-5 duration-300"
            >
              <div
                className="w-full sm:w-auto flex items-center justify-between gap-3 sm:gap-5 pl-5 pr-3 py-2.5 rounded-full shadow-2xl transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #FFFFFF 0%, #FFFDF9 60%, #FAF4EB 100%)",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 12px 36px rgba(11, 32, 59, 0.12), 0 3px 10px rgba(0, 0, 0, 0.04)",
                }}
              >
                {/* Clickable Cart Info & Checkout CTA */}
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedOrder(null);
                    setIsDrawerOpen(true);
                  }}
                  className="flex items-center gap-4 sm:gap-6 text-left cursor-pointer group"
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-[#C68B59]">
                      Delivery Bag
                    </p>
                    <p className="text-sm sm:text-base font-bold text-[#0B203B] group-hover:text-[#0084D1] transition-colors">
                      {totalItemsCount} item{totalItemsCount > 1 ? "s" : ""} • €{subtotal.toFixed(2)}
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm transition-transform group-hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #0084D1 0%, #006AA8 100%)",
                    }}
                  >
                    <span>Checkout Order</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </button>

                {/* Sibling Actions: Clear & Close */}
                <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => setShowClearWarning(true)}
                    className="px-2.5 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Clear Delivery Bag"
                    aria-label="Clear Delivery Bag"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsBarDismissed(true)}
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#0B203B] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title="Dismiss delivery bar"
                    aria-label="Dismiss delivery bar"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </aside>
          )}
        </>
      )}

      {/* ================================================================= */}
      {/* 4. SLIDE-OVER CHECKOUT DRAWER / MODAL                            */}
      {/* ================================================================= */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => {
              setIsDrawerOpen(false);
              setSubmittedOrder(null);
            }}
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
                  {submittedOrder
                    ? "Order Submitted • Bag Reset"
                    : `${totalItemsCount} dish${totalItemsCount > 1 ? "es" : ""} • WhatsApp checkout`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  setSubmittedOrder(null);
                }}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0B203B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div
              className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-8 scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {submittedOrder ? (
                <div className="text-center py-12 px-2 space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4
                      className="text-2xl text-[#0B203B]"
                      style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
                    >
                      Order Sent to WhatsApp!
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4c6f92] max-w-xs mx-auto">
                      Your delivery bag has been automatically reset. Send the pre-filled message in WhatsApp to confirm your delivery with our team.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedOrder(null);
                        setIsDrawerOpen(false);
                      }}
                      className="px-6 py-2.5 rounded-full text-white text-xs sm:text-sm font-medium transition-transform hover:scale-105 cursor-pointer shadow-md"
                      style={{ background: "#0B203B" }}
                    >
                      Start New Order
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const waUrl = `https://wa.me/${DELIVERY_WHATSAPP_CLEAN}?text=${encodeURIComponent(submittedOrder)}`;
                        window.open(waUrl, "_blank", "noopener,noreferrer");
                      }}
                      className="px-6 py-2.5 rounded-full text-white text-xs sm:text-sm font-medium transition-transform hover:scale-105 cursor-pointer shadow-md flex items-center justify-center gap-2"
                      style={{ background: "#25D366" }}
                    >
                      <span>Re-open WhatsApp</span>
                    </button>
                  </div>
                </div>
              ) : cart.length === 0 ? (
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
                        onClick={() => setShowClearWarning(true)}
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
                                  maxLength={120}
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
                          maxLength={60}
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
                          maxLength={25}
                          placeholder="Enter your phone or WhatsApp number here..."
                          className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border border-[#C68B59]/30 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Destination Type Selectors */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#0B203B]">Location Type</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { id: "resort" as const, label: "Resort / Hotel", Icon: Hotel },
                          { id: "yacht" as const, label: "Yacht / Boat", Icon: Sailboat },
                          { id: "apartment" as const, label: "Studio / Apartment", Icon: Building2 },
                          { id: "residence" as const, label: "Private Villa", Icon: Home },
                          { id: "outside" as const, label: "Outside Port Ghalib", Icon: MapPin },
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
                          : form.destinationType === "apartment"
                          ? "Studio / Apartment & Building Name *"
                          : form.destinationType === "residence"
                          ? "Villa Number / Street Address *"
                          : form.destinationType === "outside"
                          ? "Delivery Address Outside Port Ghalib *"
                          : "Marina Location *"}
                      </label>
                      <input
                        type="text"
                        value={form.destinationDetails}
                        onChange={(e) => setForm({ ...form, destinationDetails: e.target.value })}
                        maxLength={150}
                        placeholder={
                          form.destinationType === "resort"
                            ? "Enter your resort name and room number here..."
                            : form.destinationType === "yacht"
                            ? "Enter your boat name and pier or berth number here..."
                            : form.destinationType === "apartment"
                            ? "Enter your studio/apartment building and unit number here..."
                            : form.destinationType === "residence"
                            ? "Enter your villa or apartment address here..."
                            : form.destinationType === "outside"
                            ? "Enter your location or hotel outside Port Ghalib here..."
                            : "Enter Your Marina Location"
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
                      {/* Custom Delivery Time Dropdown */}
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#0B203B]">Delivery Time</label>
                        <div className="relative" ref={deliveryTimeRef}>
                          <button
                            type="button"
                            onClick={() => setIsDeliveryTimeOpen((prev) => !prev)}
                            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border transition-all text-left cursor-pointer"
                            style={{
                              borderColor: isDeliveryTimeOpen ? "#C68B59" : "rgba(198,139,89,0.3)",
                              boxShadow: isDeliveryTimeOpen
                                ? "0 0 0 2px rgba(198,139,89,0.2)"
                                : "0 1px 3px rgba(11,32,59,0.03)",
                            }}
                          >
                            <span className="font-medium text-[#0B203B] truncate">
                              {form.deliveryTime === "asap" ? "As fast as possible" : "Schedule for later today"}
                            </span>
                            <ChevronDown
                              className="w-4 h-4 text-[#C68B59] transition-transform duration-200 shrink-0 ml-1.5"
                              style={{ transform: isDeliveryTimeOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                            />
                          </button>

                          {isDeliveryTimeOpen && (
                            <div
                              className="absolute left-0 top-[calc(100%+6px)] w-full rounded-2xl p-1.5 z-40 shadow-xl border border-[#C68B59]/30 bg-[#FFFDF9] space-y-1 animate-in fade-in zoom-in-95 duration-150"
                              style={{
                                boxShadow: "0 12px 30px rgba(11,32,59,0.15), 0 4px 10px rgba(198,139,89,0.1)",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setForm({ ...form, deliveryTime: "asap" });
                                  setIsDeliveryTimeOpen(false);
                                }}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-colors cursor-pointer"
                                style={{
                                  background: form.deliveryTime === "asap" ? "#FAF4EC" : "transparent",
                                  color: form.deliveryTime === "asap" ? "#0B203B" : "#4c6f92",
                                  fontWeight: form.deliveryTime === "asap" ? 600 : 400,
                                }}
                              >
                                <span>As fast as possible</span>
                                {form.deliveryTime === "asap" && (
                                  <Check className="w-3.5 h-3.5 text-[#C68B59] shrink-0" />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setForm({ ...form, deliveryTime: "scheduled" });
                                  setIsDeliveryTimeOpen(false);
                                }}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-colors cursor-pointer"
                                style={{
                                  background: form.deliveryTime === "scheduled" ? "#FAF4EC" : "transparent",
                                  color: form.deliveryTime === "scheduled" ? "#0B203B" : "#4c6f92",
                                  fontWeight: form.deliveryTime === "scheduled" ? 600 : 400,
                                }}
                              >
                                <span>Schedule for later today</span>
                                {form.deliveryTime === "scheduled" && (
                                  <Check className="w-3.5 h-3.5 text-[#C68B59] shrink-0" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Custom Payment on Arrival Dropdown */}
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#0B203B]">Payment on Arrival</label>
                        <div className="relative" ref={paymentRef}>
                          <button
                            type="button"
                            onClick={() => setIsPaymentOpen((prev) => !prev)}
                            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border transition-all text-left cursor-pointer"
                            style={{
                              borderColor: isPaymentOpen ? "#C68B59" : "rgba(198,139,89,0.3)",
                              boxShadow: isPaymentOpen
                                ? "0 0 0 2px rgba(198,139,89,0.2)"
                                : "0 1px 3px rgba(11,32,59,0.03)",
                            }}
                          >
                            <span className="font-medium text-[#0B203B] truncate">
                              {form.paymentMethod === "cash"
                                ? "Cash (EGP, EUR, USD)"
                                : "Card Machine (Visa/Mastercard)"}
                            </span>
                            <ChevronDown
                              className="w-4 h-4 text-[#C68B59] transition-transform duration-200 shrink-0 ml-1.5"
                              style={{ transform: isPaymentOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                            />
                          </button>

                          {isPaymentOpen && (
                            <div
                              className="absolute left-0 top-[calc(100%+6px)] w-full rounded-2xl p-1.5 z-40 shadow-xl border border-[#C68B59]/30 bg-[#FFFDF9] space-y-1 animate-in fade-in zoom-in-95 duration-150"
                              style={{
                                boxShadow: "0 12px 30px rgba(11,32,59,0.15), 0 4px 10px rgba(198,139,89,0.1)",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setForm({ ...form, paymentMethod: "cash" });
                                  setIsPaymentOpen(false);
                                }}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-colors cursor-pointer"
                                style={{
                                  background: form.paymentMethod === "cash" ? "#FAF4EC" : "transparent",
                                  color: form.paymentMethod === "cash" ? "#0B203B" : "#4c6f92",
                                  fontWeight: form.paymentMethod === "cash" ? 600 : 400,
                                }}
                              >
                                <span>Cash (EGP, EUR, USD)</span>
                                {form.paymentMethod === "cash" && (
                                  <Check className="w-3.5 h-3.5 text-[#C68B59] shrink-0" />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setForm({ ...form, paymentMethod: "card" });
                                  setIsPaymentOpen(false);
                                }}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-colors cursor-pointer"
                                style={{
                                  background: form.paymentMethod === "card" ? "#FAF4EC" : "transparent",
                                  color: form.paymentMethod === "card" ? "#0B203B" : "#4c6f92",
                                  fontWeight: form.paymentMethod === "card" ? 600 : 400,
                                }}
                              >
                                <span>Card Machine (Visa/Mastercard)</span>
                                {form.paymentMethod === "card" && (
                                  <Check className="w-3.5 h-3.5 text-[#C68B59] shrink-0" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Custom UI for Scheduled Time Selection */}
                    {form.deliveryTime === "scheduled" && (
                      <div
                        className="p-3.5 rounded-2xl border border-[#C68B59]/30 space-y-3 transition-all animate-in fade-in slide-in-from-top-2 duration-200"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 244, 236, 0.9) 100%)",
                          boxShadow: "0 4px 15px rgba(11, 32, 59, 0.04)",
                        }}
                      >
                        {/* Selected Time Display Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#C68B59]/15 text-[#C68B59]">
                              <Clock className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className="text-[11px] font-semibold text-[#0B203B] uppercase tracking-wider">
                                Scheduled Arrival Time
                              </p>
                            </div>
                          </div>

                          <div className="px-3 py-1 rounded-xl bg-[#0B203B] text-[#FAF6F0] font-semibold text-xs sm:text-sm tracking-wide shadow-sm flex items-center gap-1.5">
                            <span>{format12Hour(form.scheduledTime)}</span>
                            <span className="text-[10px] text-[#C68B59] font-normal">({form.scheduledTime})</span>
                          </div>
                        </div>

                        {/* Interactive Hour & Minute Stepper */}
                        <div className="grid grid-cols-2 gap-2 pt-0.5">
                          {/* Hour Stepper */}
                          <div className="p-2 rounded-xl bg-white border border-[#C68B59]/25 flex items-center justify-between shadow-xs">
                            <button
                              type="button"
                              onClick={() => adjustHour(-1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#FAF4EC] hover:bg-[#C68B59]/20 text-[#0B203B] transition-colors cursor-pointer"
                              aria-label="Previous Hour"
                            >
                              <Minus className="w-3.5 h-3.5 text-[#C68B59]" />
                            </button>
                            <div className="text-center px-1">
                              <span className="block text-[9px] uppercase tracking-wider text-[#4c6f92] font-medium">
                                Hour
                              </span>
                              <span className="text-xs sm:text-sm font-semibold text-[#0B203B]">
                                {formatHourLabel(form.scheduledTime)}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => adjustHour(1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#FAF4EC] hover:bg-[#C68B59]/20 text-[#0B203B] transition-colors cursor-pointer"
                              aria-label="Next Hour"
                            >
                              <Plus className="w-3.5 h-3.5 text-[#C68B59]" />
                            </button>
                          </div>

                          {/* Minute Stepper */}
                          <div className="p-2 rounded-xl bg-white border border-[#C68B59]/25 flex items-center justify-between shadow-xs">
                            <button
                              type="button"
                              onClick={() => adjustMinute(-15)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#FAF4EC] hover:bg-[#C68B59]/20 text-[#0B203B] transition-colors cursor-pointer"
                              aria-label="Previous 15 Minutes"
                            >
                              <Minus className="w-3.5 h-3.5 text-[#C68B59]" />
                            </button>
                            <div className="text-center px-1">
                              <span className="block text-[9px] uppercase tracking-wider text-[#4c6f92] font-medium">
                                Minute
                              </span>
                              <span className="text-xs sm:text-sm font-semibold text-[#0B203B]">
                                :{form.scheduledTime.split(":")[1] || "00"}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => adjustMinute(15)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#FAF4EC] hover:bg-[#C68B59]/20 text-[#0B203B] transition-colors cursor-pointer"
                              aria-label="Next 15 Minutes"
                            >
                              <Plus className="w-3.5 h-3.5 text-[#C68B59]" />
                            </button>
                          </div>
                        </div>

                        {/* Quick Preset Dining Slots */}
                        <div className="space-y-1.5 pt-0.5">
                          <span className="block text-[10px] font-semibold text-[#4c6f92] uppercase tracking-wider">
                            Popular Dining Times
                          </span>
                          <div className="grid grid-cols-4 gap-1.5">
                            {presetTimes.map((preset) => {
                              const isSelected = form.scheduledTime === preset.value;
                              return (
                                <button
                                  key={preset.value}
                                  type="button"
                                  onClick={() => setForm({ ...form, scheduledTime: preset.value })}
                                  className="py-1.5 px-1 rounded-lg text-center text-[11px] font-medium transition-all cursor-pointer"
                                  style={{
                                    background: isSelected ? "#C68B59" : "rgba(255,255,255,0.9)",
                                    color: isSelected ? "#FAF6F0" : "#0B203B",
                                    border: isSelected
                                      ? "1px solid #C68B59"
                                      : "1px solid rgba(198,139,89,0.25)",
                                    boxShadow: isSelected ? "0 2px 8px rgba(198,139,89,0.3)" : "none",
                                  }}
                                >
                                  {preset.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Special requests */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#0B203B]">
                        Special Requests / Cutlery & Allergies
                      </label>
                      <textarea
                        rows={2}
                        value={form.specialNotes}
                        onChange={(e) => setForm({ ...form, specialNotes: e.target.value })}
                        maxLength={250}
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

      {/* ================================================================= */}
      {/* 5. CLEAR BAG CONFIRMATION WARNING MODAL                           */}
      {/* ================================================================= */}
      {showClearWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl border border-[#C68B59]/30 bg-[#FFFDF9] animate-in zoom-in-95 duration-200"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="clear-bag-dialog-title"
            aria-describedby="clear-bag-dialog-desc"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200/60 shadow-xs">
              <Trash2 className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3
                id="clear-bag-dialog-title"
                className="text-2xl text-[#0B203B]"
                style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
              >
                Clear Delivery Bag?
              </h3>
              <p
                id="clear-bag-dialog-desc"
                className="text-xs sm:text-sm text-[#4c6f92] leading-relaxed"
              >
                Are you sure you want to remove all {totalItemsCount} dish{totalItemsCount > 1 ? "es" : ""} from your delivery bag? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearWarning(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-[#0B203B] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  setShowClearWarning(false);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-md cursor-pointer"
              >
                Yes, Clear Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
