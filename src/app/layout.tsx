// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import ClientLoaded from "@/components/ClientLoaded"; // optional
import Navbar from "@/components/Navbar";              // Navbar must be a client component
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Destiny",
  description: "Explore Destiny",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ClientLoaded />

        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
3