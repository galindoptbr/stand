import Image from "next/image";
import React from "react";

import { SlSocialFacebook, SlSocialInstagram } from "react-icons/sl";

import logoOlavo from "@/assets/images/logo-olavo.png";
import paymentsMethods from "@/assets/images/payments.png";

export const Footer = () => {
  return (
    <>
      <div className="w-full bg-zinc-900 mt-8 p-6 h-96">
        <div className="flex justify-between max-w-[1200px] m-auto gap-6">
          <div className="flex flex-col gap-4 w-64   ">
            <span className="font-bold">Sobre Nos</span>
            <Image className="w-24" src={logoOlavo} alt="logo Olavo" />
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              in ex modi quasi reiciendis.
            </span>
            <div className="flex flex-col gap-6">
              <span className="font-semibold">Saiba mais</span>
              <div className="flex gap-2">
                <SlSocialFacebook size={20} />
                <SlSocialInstagram size={20} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span className="font-bold">Contatos</span>
            <div className="flex flex-col gap-3">
              <span className="font-semibold">Endereco</span>
              <span>123 Street Name, City, England</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold">Telefone</span>
              <span>Tell Free (123) 456-7890</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold">EMAIL</span>
              <span>mail@example.com</span>
            </div>
          </div>
          <div>
            <span className="font-bold">Formas de Pagamento</span>
            <Image
              className="w-36 mt-4 rounded-md"
              src={paymentsMethods}
              alt="metodos de pagamento"
            />
          </div>
        </div>
      </div>
    </>
  );
};
