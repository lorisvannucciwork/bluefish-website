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

const arapey = localFont({
  src: [
    {
      path: "./fonts/Arapey-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Arapey-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-arapey",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bluefishportghalib.com"),
  title: "Blue Fish | Sushi • Seafood • Seaview",
  description:
    "Experience the finest sushi, seafood, and sunset dining with panoramic seaviews at Blue Fish Port Ghalib Marina.",
  keywords: ["Blue Fish", "Sushi", "Seafood", "Seaview", "Fine Dining", "Port Ghalib", "Marina"],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    google: "notranslate",
    googlebot: "notranslate",
    "Content-Language": "en",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveatBrush.variable} ${montserrat.variable} ${arapey.variable} scroll-smooth notranslate`}
      translate="no"
    >
      <head>
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="notranslate" />
        <meta httpEquiv="Content-Language" content="en" />
      </head>
      <body
        translate="no"
        className="font-sans antialiased bg-[#F4F8FC] text-[#0B203B] selection:bg-[#0084D1]/20 selection:text-[#0084D1] notranslate"
      >
        {children}
      </body>
    </html>
  );
}
