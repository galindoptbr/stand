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
      <div className="w-full bg-[#181818]">
        <div className="flex justify-between m-auto p-2 max-w-[1200px]">
          <Image className="w-36 rounded-lg" src={logoOlavo} alt="logo olavo" />
          <ul className="flex justify-center gap-4 items-center font-semibold">
            <li>
              <Link
                href="/"
                replace
                className={`${
                  pathname === "/"
                    ? "text-yellow-500"
                    : "text-white hover:text-yellow-500"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className={`${
                  pathname === "/catalog"
                    ? "text-yellow-500"
                    : "text-white hover:text-yellow-500"
                }`}
              >
                Catalogo
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`${
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
