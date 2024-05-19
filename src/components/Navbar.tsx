import Image from "next/image";
import React from "react";

import logoOlavo from "@/assets/images/logo-olavo.png";
import Link from "next/link";

export const Navbar = () => {
  return (
    <>
      <div className="w-full bg-zinc-900">
        <div className="flex justify-between m-auto p-5 max-w-[1200px]">
          <Image className="w-36" src={logoOlavo} alt="logo olavo" />
          <ul className="flex justify-center gap-4 items-center font-semibold">
            <li>
              <Link href="/" replace>
                Home
              </Link>
            </li>
            <li>Sobre</li>
            <li>
              <Link href="/">
              Produtos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
