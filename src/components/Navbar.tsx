"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logoOlavo from "@/assets/images/logo-olavo.png";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="w-full bg-[#181818] shadow-lg">
        <div className="flex justify-between items-center m-auto p-4 max-w-[1200px]">
          <Image className="w-24 rounded-lg" src={logoOlavo} alt="logo olavo" />
          <ul className="flex justify-center gap-8 items-center font-semibold">
            <li>
              <Link
                href="/"
                replace
                className={`transition-colors duration-300 ${
                  pathname === "/"
                    ? "text-yellow-500"
                    : "text-white hover:text-yellow-500"
                }`}
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className={`transition-colors duration-300 ${
                  pathname === "/catalog"
                    ? "text-yellow-500"
                    : "text-white hover:text-yellow-500"
                }`}
              >
                Catálogo
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`transition-colors duration-300 ${
                  pathname === "/about"
                    ? "text-yellow-500"
                    : "text-white hover:text-yellow-500"
                }`}
              >
                Sobre
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
