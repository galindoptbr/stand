import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Olavo Wheels",
  description: "Olavo Scale wheels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="text-zinc-100 bg-black">
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
