"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck, PackageCheck, Anchor, Utensils, HelpCircle } from "lucide-react";
import { deliveryFaqs, deliveryHighlights } from "@/data/deliveryData";

export default function DeliveryFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-6 pt-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C68B59]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Delivery Questions</span>
          </div>
          <h3
            className="text-2xl sm:text-3xl text-[#4c6f92]"
            style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
          >
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3 pt-4">
          {deliveryFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl transition-all duration-300 overflow-hidden"
                style={{
                  background: isOpen ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
                  border: isOpen
                    ? "1px solid rgba(198,139,89,0.5)"
                    : "1px solid rgba(198,139,89,0.2)",
                  boxShadow: isOpen
                    ? "0 10px 25px -10px rgba(198,139,89,0.15)"
                    : "0 2px 8px rgba(11,32,59,0.02)",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span
                    className="font-medium text-base sm:text-lg text-[#4c6f92] tracking-wide"
                    style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className="w-5 h-5 shrink-0 text-[#C68B59] transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-[#4c6f92]/80 leading-relaxed border-t border-[#C68B59]/15 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
