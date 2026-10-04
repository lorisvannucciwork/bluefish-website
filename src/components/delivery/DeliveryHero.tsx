"use client";

import { SkeletonOverlay, useImageLoaded } from "@/components/ui/ImageSkeleton";
import { Clock, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { DELIVERY_AVG_TIME, DELIVERY_HOURS, DELIVERY_PHONE_INTL, DELIVERY_WHATSAPP_CLEAN } from "@/data/deliveryData";

export default function DeliveryHero() {
  const {
    loaded: heroLoaded,
    onLoad: onHeroLoad,
    onError: onHeroError,
    setNode: setHeroNode,
  } = useImageLoaded();

  return (
    <section className="relative overflow-hidden font-sans min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28">
      {/* Background Hero Image */}
      <SkeletonOverlay loaded={heroLoaded} variant="dark" />
      <img
        ref={setHeroNode}
        alt="Blue Fish Port Ghalib Waterfront Marina"
        src="/images/hero/hero.webp"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          heroLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={onHeroLoad}
        onError={onHeroError}
      />

      {/* Dark overlay for contrast & readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,32,59,0.6) 0%, rgba(11,32,59,0.38) 40%, rgba(7,20,40,0.85) 100%)",
        }}
      />

      {/* Ambient soft glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(0,132,209,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 my-auto w-full text-center flex flex-col items-center justify-center space-y-6">
        {/* Subtle Live Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF6F0] text-xs sm:text-sm tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Port Ghalib Express Delivery • Open Today</span>
        </div>

        {/* Title */}
        <h1
          className="font-sans leading-none tracking-tight"
          style={{
            fontSize: "clamp(3.2rem, 8vw, 6.2rem)",
            color: "#FAF6F0",
            lineHeight: 1.05,
            textShadow: "0 4px 24px rgba(0,0,0,0.5)",
          }}
        >
          BlueFish <span style={{ color: "#C68B59" }}>Delivery</span>
        </h1>

        {/* Tagline */}
        <p
          className="uppercase tracking-[0.2em] font-normal max-w-3xl"
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.5rem)",
            color: "#FAF6F0",
            fontFamily: "var(--font-arapey), Georgia, serif",
            textShadow: "0 2px 14px rgba(0,0,0,0.5)",
          }}
        >
          FRESH TO YOUR RESORT
          <span className="text-[#0084D1] mx-2.5 sm:mx-3 text-[0.6em] align-middle leading-none inline-block">
            •
          </span>
          MARINA YACHT
          <span className="text-[#0084D1] mx-2.5 sm:mx-3 text-[0.6em] align-middle leading-none inline-block">
            •
          </span>
          PRIVATE VILLA
        </p>

        {/* Quick Highlights Grid */}
        <div className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl w-full text-left">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white/90 space-y-1">
            <div className="flex items-center gap-2 text-[#C68B59]">
              <Clock className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider">Fast Service</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-white">{DELIVERY_AVG_TIME}</p>
            <p className="text-[11px] text-white/70">{DELIVERY_HOURS}</p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white/90 space-y-1">
            <div className="flex items-center gap-2 text-[#0084D1]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider">Coverage</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-white">All Port Ghalib</p>
            <p className="text-[11px] text-white/70">Hotels, Resorts & Marina</p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white/90 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400">
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider">Ordering</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-white">Via WhatsApp</p>
            <p className="text-[11px] text-white/70">1-Click Live Confirmation</p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white/90 space-y-1">
            <div className="flex items-center gap-2 text-[#C68B59]">
              <Phone className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider">Delivery Line</span>
            </div>
            <a
              href={`tel:${DELIVERY_PHONE_INTL.replace(/\s+/g, "")}`}
              className="text-sm sm:text-base font-medium text-white hover:text-[#C68B59] transition-colors block truncate"
            >
              {DELIVERY_PHONE_INTL}
            </a>
            <p className="text-[11px] text-white/70">Direct kitchen line</p>
          </div>
        </div>

        {/* CTA Anchors */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#delivery-menu"
            className="px-6 sm:px-8 py-3 rounded-full text-white text-sm sm:text-base font-medium tracking-wide transition-all duration-300 shadow-lg cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #C68B59 0%, #B07442 100%)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(198,139,89,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Explore Delivery Dishes & Bag
          </a>

          <a
            href={`https://wa.me/${DELIVERY_WHATSAPP_CLEAN}?text=${encodeURIComponent(
              "Hello Blue Fish Port Ghalib! I would like to inquire about delivery to my hotel/yacht."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white text-sm sm:text-base font-medium tracking-wide backdrop-blur-md border border-white/30 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* === WAVE BOTTOM BORDER === */}
      <div className="relative z-10" style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "80px" }}
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#F5EFE7"
          />
        </svg>
      </div>
    </section>
  );
}
