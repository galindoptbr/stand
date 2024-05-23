import Image from "next/image";
import React from "react";

import bannerTopo from "@/assets/images/banner-about1.png";
import { CiDeliveryTruck } from "react-icons/ci";
import { SlLocationPin, SlPrinter } from "react-icons/sl";

export const Banner = () => {
  return (
    <>
      <div>
        <Image className="w-full m-auto" src={bannerTopo} alt="Banner site" />
      </div>
      <div className="w-full h-20 bg-zinc-600">
        <div className="flex justify-center gap-4">
          <div className="flex items-center mt-6 gap-4 text-zinc-300 border-e-2 border-zinc-300">
            <CiDeliveryTruck size={35} />
            <p className="font-semibold text-md mr-4">
            Portes Grátis para pedidos acima de 5 sets!{" "}
            </p>
          </div>
          <div className="flex items-center mt-6 gap-4 text-zinc-300 border-e-2 border-zinc-300">
            <SlPrinter size={25} />
            <p className="font-semibold text-md mr-4">
              Impressão feita em 24hs!{" "}
            </p>
          </div>
          <div className="flex items-center mt-6 gap-4 text-zinc-300">
            <SlLocationPin size={25} />
            <p className="font-semibold text-md">
              Aberto 7 dias por semana!{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
