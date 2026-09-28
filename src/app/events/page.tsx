import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import EventsHero from "@/components/events/EventsHero";
import EventExperiences from "@/components/events/EventExperiences";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Private Events & Celebrations | Blue Fish Port Ghalib Marina",
  description:
    "Host unforgettable waterfront wedding receptions, executive dinners, sunset cocktail parties, and bespoke celebrations with world-class Mediterranean seafood and sushi at Blue Fish Port Ghalib.",
  openGraph: {
    title: "Private Events & Celebrations | Blue Fish Port Ghalib Marina",
    description:
      "Waterfront marina terraces, private glass salons, and tailored omakase dining for luxury celebrations in Port Ghalib, Red Sea.",
  },
};

export default function EventsPage() {
  return (
    <div
      className="min-h-screen text-[#0B203B] flex flex-col justify-between font-sans"
      style={{ background: "#F5EFE7" }}
    >
      <Navbar variant="solid" />
      <main className="flex-grow">
        <EventsHero />
        <EventExperiences />
      </main>
      <Footer />
    </div>
  );
}
