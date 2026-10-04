"use client";

import { ShieldCheck, PackageCheck, Anchor, Utensils } from "lucide-react";
import { deliveryHighlights } from "@/data/deliveryData";

export default function DeliveryFaq() {
  return (
    <div className="space-y-16 pt-12 border-t border-[#C68B59]/25">
      {/* 4 Packaging Highlights Cards */}
      <div className="space-y-6 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C68B59] font-medium">
          Ocean-Fresh Standards
        </span>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl text-[#4c6f92]"
          style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
        >
          Carefully Packed for Coastal Transit
        </h2>
        <p className="text-sm sm:text-base text-[#4c6f92]/80 max-w-2xl mx-auto">
          Whether you are unwinding in your resort suite or anchored on your yacht in Port Ghalib Marina, our delivery standard guarantees kitchen-fresh quality.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-left">
          {deliveryHighlights.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl transition-all duration-300 space-y-3"
              style={{
                background: "linear-gradient(165deg, #FFFFFF 0%, #FDFBF7 100%)",
                border: "1px solid rgba(198,139,89,0.25)",
                boxShadow: "0 6px 20px -8px rgba(11,32,59,0.06)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{
                  background: idx % 2 === 0 ? "#C68B59" : "#4c6f92",
                }}
              >
                {idx === 0 && <PackageCheck className="w-5 h-5" />}
                {idx === 1 && <Anchor className="w-5 h-5" />}
                {idx === 2 && <ShieldCheck className="w-5 h-5" />}
                {idx === 3 && <Utensils className="w-5 h-5" />}
              </div>
              <h4
                className="text-lg font-medium text-[#4c6f92]"
                style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
              >
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#4c6f92]/80 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
