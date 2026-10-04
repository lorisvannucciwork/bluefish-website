import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import MenuHero from "@/components/menu/MenuHero";
import MenuCatalog from "@/components/menu/MenuCatalog";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Menu | Blue Fish Sushi • Seafood • Seaview",
  description:
    "Explore BlueFish menu: Appetizers, Soups, Salads, Nigiri, Sashimi, Special Rolls, Dynamite, Chef's Mix Plates, Cocktails, and Wines along the Port Ghalib Marina waterfront.",
};

export default function MenuPage() {
  return (
    <div className="min-h-screen text-[#4c6f92] flex flex-col justify-between font-sans" style={{ background: "#F5EFE7", userSelect: "none" }}>
      <Navbar variant="solid" />
      <main className="flex-grow">
        <MenuHero />
        <MenuCatalog />
      </main>
      <Footer />
    </div>
  );
}
