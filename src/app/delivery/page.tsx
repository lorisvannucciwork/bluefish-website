import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import DeliveryHero from "@/components/delivery/DeliveryHero";
import DeliveryExperience from "@/components/delivery/DeliveryExperience";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Delivery to Resort & Yacht | Blue Fish Port Ghalib Marina",
  description:
    "Order ocean-fresh sushi, seafood platters, and specialty rolls delivered directly to your Port Ghalib hotel, resort room, or marina yacht berth. Fast WhatsApp ordering: +20 1109789626.",
  keywords: [
    "Blue Fish Delivery",
    "Port Ghalib Food Delivery",
    "Sushi Delivery Marsa Alam",
    "Yacht Delivery Port Ghalib",
    "Hotel Food Delivery Port Ghalib",
    "Pickalbatros Delivery",
  ],
};

export default function DeliveryPage() {
  return (
    <div
      className="min-h-screen text-[#4c6f92] flex flex-col justify-between font-sans"
      style={{ background: "#F5EFE7", userSelect: "none" }}
    >
      <Navbar variant="solid" />
      <main className="flex-grow">
        <DeliveryHero />
        <DeliveryExperience />
      </main>
      <Footer />
    </div>
  );
}
