"use client";

import { useState } from "react";
import { eventFaqs } from "@/data/eventsData";
import {
  Send,
  Calendar,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Phone,
  Mail,
  Clock,
  Sparkles,
} from "lucide-react";

export default function EventInquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "wedding",
    guests: "25-50",
    date: "",
    space: "waterfront",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="inquiry" className="py-20 sm:py-28 relative overflow-hidden font-sans">
      {/* Glow effects */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(198,139,89,0.14) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-96 h-96 pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,132,209,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* ================================================================= */}
        {/* INQUIRY FORM CONTAINER                                            */}
        {/* ================================================================= */}
        <div
          className="rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(145deg, #FFFDF9, #F5EFE7)",
            border: "1px solid rgba(198,139,89,0.3)",
            boxShadow: "0 20px 60px rgba(11,32,59,0.08)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Context & Concierge Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-sans tracking-[0.2em] uppercase font-bold"
                  style={{
                    background: "rgba(198,139,89,0.12)",
                    color: "#C68B59",
                    border: "1px solid rgba(198,139,89,0.3)",
                  }}
                >
                  <Sparkles style={{ width: "13px", height: "13px" }} />
                  <span>Private Concierge</span>
                </div>

                <h2
                  className="font-sans leading-tight text-3xl sm:text-4xl lg:text-5xl text-[#0B203B]"
                  style={{ lineHeight: 1.15 }}
                >
                  Plan Your Event
                </h2>

                <p
                  className="text-sm sm:text-base text-[#0B203B]/75 leading-relaxed font-light"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  Share your preferred date and requirements. Our dedicated event planning specialist
                  will contact you within 24 hours with custom menu proposals and availability.
                </p>
              </div>

              {/* Direct Concierge Contact Cards */}
              <div className="space-y-4 pt-4 border-t border-[#C68B59]/20">
                <div className="text-xs font-bold uppercase tracking-wider text-[#0B203B]/70">
                  Direct Inquiries & Bookings
                </div>

                <div className="space-y-3">
                  <a
                    href="tel:+201000000000"
                    className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 hover:translate-x-1"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(198,139,89,0.2)",
                    }}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#C68B59]/15 flex items-center justify-center text-[#C68B59] shrink-0">
                      <Phone style={{ width: "16px", height: "16px" }} />
                    </div>
                    <div>
                      <div className="text-xs text-[#0B203B]/60 font-sans">Events Hotline</div>
                      <div className="text-sm font-sans font-bold text-[#0B203B]">+20 (0) 65 375 0100</div>
                    </div>
                  </a>

                  <a
                    href="mailto:events@bluefish-portghalib.com"
                    className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 hover:translate-x-1"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(198,139,89,0.2)",
                    }}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#0084D1]/15 flex items-center justify-center text-[#0084D1] shrink-0">
                      <Mail style={{ width: "16px", height: "16px" }} />
                    </div>
                    <div>
                      <div className="text-xs text-[#0B203B]/60 font-sans">Email Concierge</div>
                      <div className="text-sm font-sans font-bold text-[#0B203B]">events@bluefish-portghalib.com</div>
                    </div>
                  </a>

                  <div
                    className="flex items-center gap-3 p-3.5 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(198,139,89,0.2)",
                    }}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#5A9E6E]/15 flex items-center justify-center text-[#5A9E6E] shrink-0">
                      <Clock style={{ width: "16px", height: "16px" }} />
                    </div>
                    <div>
                      <div className="text-xs text-[#0B203B]/60 font-sans">Response Time</div>
                      <div className="text-sm font-sans font-bold text-[#0B203B]">Guaranteed under 24 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: The Interactive Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div
                  className="p-8 sm:p-12 text-center rounded-3xl space-y-5"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    border: "1px solid rgba(198,139,89,0.4)",
                    boxShadow: "0 10px 30px rgba(139,80,40,0.08)",
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#5A9E6E]/15 text-[#5A9E6E] flex items-center justify-center mx-auto">
                    <CheckCircle style={{ width: "32px", height: "32px" }} />
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl text-[#0B203B]">
                    Inquiry Received
                  </h3>

                  <p
                    className="text-sm sm:text-base text-[#0B203B]/75 max-w-md mx-auto leading-relaxed font-light"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Thank you, <span className="font-bold text-[#0B203B]">{formData.fullName}</span>.
                    Our event coordinator has logged your request and will reach out shortly via email
                    and phone with custom menu selections and space availability.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-widest font-semibold text-[#0B203B] border border-[#0B203B]/30 hover:bg-[#0B203B] hover:text-white transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#0B203B]/80">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none text-sm text-[#0B203B]"
                        style={{
                          background: "rgba(255,255,255,0.85)",
                          border: "1px solid rgba(198,139,89,0.3)",
                        }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#0B203B]/80">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. elena@example.com"
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none text-sm text-[#0B203B]"
                        style={{
                          background: "rgba(255,255,255,0.85)",
                          border: "1px solid rgba(198,139,89,0.3)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Event Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#0B203B]/80">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+20 / +39 / +44 ..."
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none text-sm text-[#0B203B]"
                        style={{
                          background: "rgba(255,255,255,0.85)",
                          border: "1px solid rgba(198,139,89,0.3)",
                        }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#0B203B]/80">
                        Event Type
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none text-sm text-[#0B203B] cursor-pointer"
                        style={{
                          background: "rgba(255,255,255,0.85)",
                          border: "1px solid rgba(198,139,89,0.3)",
                        }}
                      >
                        <option value="wedding">Marina Wedding & Reception</option>
                        <option value="corporate">Executive Dinner / Corporate Gala</option>
                        <option value="birthday">Milestone Birthday / Anniversary</option>
                        <option value="cocktail">Cocktail Party & DJ Session</option>
                        <option value="buyout">Full Restaurant Buyout</option>
                        <option value="other">Other Celebration</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Guest Count & Preferred Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#0B203B]/80">
                        Estimated Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none text-sm text-[#0B203B] cursor-pointer"
                        style={{
                          background: "rgba(255,255,255,0.85)",
                          border: "1px solid rgba(198,139,89,0.3)",
                        }}
                      >
                        <option value="10-25">10 to 25 Guests (Salon / Intimate)</option>
                        <option value="25-50">25 to 50 Guests (Terrace / Salon)</option>
                        <option value="50-100">50 to 100 Guests (Waterfront Deck)</option>
                        <option value="100-180">100 to 180 Guests (Full Venue Buyout)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#0B203B]/80">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none text-sm text-[#0B203B]"
                        style={{
                          background: "rgba(255,255,255,0.85)",
                          border: "1px solid rgba(198,139,89,0.3)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 4: Preferred Space */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#0B203B]/80">
                      Preferred Setting
                    </label>
                    <select
                      value={formData.space}
                      onChange={(e) => setFormData({ ...formData, space: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none text-sm text-[#0B203B] cursor-pointer"
                      style={{
                        background: "rgba(255,255,255,0.85)",
                        border: "1px solid rgba(198,139,89,0.3)",
                      }}
                    >
                      <option value="waterfront">The Marina Waterfront Deck (Alfresco • up to 120)</option>
                      <option value="salon">The VIP Sunset Salon (Private Indoor • up to 35)</option>
                      <option value="lounge">The Lounge & Omakase Bar (Cocktail • up to 65)</option>
                      <option value="buyout">Full Venue Buyout (Exclusive • up to 180)</option>
                      <option value="undecided">Help Me Choose / Undecided</option>
                    </select>
                  </div>

                  {/* Row 5: Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#0B203B]/80">
                      Custom Requests & Dietary Preferences
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Tell us about your celebration theme, specific seafood or sushi favorites, music requirements..."
                      className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none text-sm text-[#0B203B] resize-none"
                      style={{
                        background: "rgba(255,255,255,0.85)",
                        border: "1px solid rgba(198,139,89,0.3)",
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-sans text-sm uppercase tracking-widest font-bold text-white transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2"
                    style={{
                      background: "#C68B59",
                      boxShadow: "0 6px 20px rgba(198,139,89,0.35)",
                      border: "1px solid #C68B59",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#0B203B";
                      (e.currentTarget as HTMLElement).style.borderColor = "#0B203B";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#C68B59";
                      (e.currentTarget as HTMLElement).style.borderColor = "#C68B59";
                    }}
                  >
                    <Send style={{ width: "16px", height: "16px" }} />
                    <span>Submit Event Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* FAQS ACCORDION                                                    */}
        {/* ================================================================= */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase font-bold text-[#C68B59]">
              <HelpCircle style={{ width: "14px", height: "14px" }} />
              <span>Event FAQ</span>
            </div>
            <h3 className="font-sans text-2xl sm:text-3xl text-[#0B203B]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {eventFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(198,139,89,0.25)",
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left cursor-pointer transition-colors"
                  >
                    <span className="font-sans text-sm sm:text-base font-semibold text-[#0B203B]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      style={{
                        width: "18px",
                        height: "18px",
                        color: "#C68B59",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                        flexShrink: 0,
                        marginLeft: "12px",
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#0B203B]/75 leading-relaxed font-light border-t border-[#C68B59]/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
