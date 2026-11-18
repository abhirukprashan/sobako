import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monaSans = localFont({
  src: "../node_modules/mona-sans/Mona-Sans.woff2",
  variable: "--font-mona",
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
      className={`${serif.variable} ${sans.variable} ${monaSans.variable}`}
    >
      <body className="font-sans antialiased">
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
