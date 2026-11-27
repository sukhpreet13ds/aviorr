import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "animate.css";
import "./globals.css";
import "./responsive.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/Cart/CartDrawer";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Aviorr",
  description: "Cars Products",
  icons: {
    icon: "/favicon.ico?v=3",
    shortcut: "/favicon.ico?v=3",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <link
          rel="preload"
          as="video"
          href="/assets/hero-vide.mp4"
          type="video/mp4"
        />
      </head>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
