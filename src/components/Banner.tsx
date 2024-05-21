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
      <div className="w-full h-20 bg-yellow-400">
        <div className="flex justify-center gap-4">
          <div className="flex items-center mt-6 gap-4 text-zinc-900 border-e-2 border-zinc-600">
            <CiDeliveryTruck size={30} />
            <span className="font-semibold text-md mr-4">
              Porte Gratis acima de € 100{" "}
            </span>
          </div>
          <div className="flex items-center mt-6 gap-4 text-zinc-900 border-e-2 border-zinc-600">
            <SlPrinter size={25} />
            <span className="font-semibold text-md mr-4">
              Impressao feita em 24hs{" "}
            </span>
          </div>
          <div className="flex items-center mt-6 gap-4 text-zinc-900">
            <SlLocationPin size={25} />
            <span className="font-semibold text-md">
              Aberto 7 dias por semana{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
