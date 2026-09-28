import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const caveatBrush = localFont({
  src: "./fonts/CaveatBrush-Regular.woff2",
  variable: "--font-caveat-brush",
  display: "swap",
  weight: "400",
  style: "normal",
});

const montserrat = localFont({
  src: [
    {
      path: "./fonts/Montserrat-VariableFont_wght.woff2",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-Italic-VariableFont_wght.woff2",
      style: "italic",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blue Fish | Seafood • Sushi • Seaview Dining",
  description:
    "Experience the finest seafood, sushi, and sunset dining with panoramic seaviews at Blue Fish Port Ghalib Marina.",
  keywords: ["Blue Fish", "Sushi", "Seafood", "Seaview", "Fine Dining", "Port Ghalib", "Marina"],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${caveatBrush.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#F4F8FC] text-[#0B203B] selection:bg-[#0084D1]/20 selection:text-[#0084D1]">
        {children}
      </body>
    </html>
  );
}
