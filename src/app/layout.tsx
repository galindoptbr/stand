import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface CustomMetadata extends Metadata {
  image?: string;
}

export const metadata: CustomMetadata = {
  title: "Olavo Wheels",
  description: "Olavo Scale wheels",
  keywords:
    "hotwheels, wheels, scale, Rodas Hot Wheels 3D, Customização Hot Wheels, Rodas personalizadas Hot Wheels, Acessórios Hot Wheels, Rodas 3D carros miniatura, Coleção de carros Hot Wheels, Comunidade colecionadores Hot Wheels, Carros Hot Wheels vintage, Hot Wheels 3D wheels, Hot Wheels customization, Hot Wheels 3D accessories, wheels for miniature cars, Hot Wheels collectors, Hot Wheels car collection, Rare Hot Wheels models, Hot Wheels collectors community, Hot Wheels collectors guide, Hot Wheels collectors events",
  image: "/assets/images/apple-touch-icon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="text-zinc-100 bg-[#232323]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
