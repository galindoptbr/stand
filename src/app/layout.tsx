import type { Metadata } from "next";
import "./globals.css";

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
      <body className="text-zinc-100 bg-black">{children}</body>
    </html>
  );
}
