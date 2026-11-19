import type { Metadata } from "next";
import { Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import LoadingScreen from "@/components/LoadingScreen";
import FallingLeaves from "@/components/FallingLeaves";

// Two fonts site-wide, Swiss/industrial:
//  - Inter Tight: neo-grotesk for headings and body
//  - IBM Plex Mono: technical mono for labels, nav, buttons and prices
const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sobako — Natural Goodness for Every Sri Lankan Table",
  description:
    "Traditional rice, herbal porridge, stone-milled flour and wholesome pasta, grown naturally in Sri Lanka.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        <StoreProvider>
          <LoadingScreen />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <FallingLeaves />
        </StoreProvider>
      </body>
    </html>
  );
}
