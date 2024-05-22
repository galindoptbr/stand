import Image from "next/image";
import React from "react";

import profileImage from "@/assets/images/profile-image.png";

export const Depositions = () => {
  return (
    <>
      <div className="flex flex-col text-center mt-12">
        <span className="text-3xl font-semibold">
          O que nossos clientes dizem
        </span>
        <span className="text-zinc-400">
          Verifique nossas últimas avaliações de clientes e dê seu feedback.
        </span>
      </div>
      <div className="m-auto max-w-[1200px] rounded-md h-56 bg-[#282828] mt-6">
        <div className="flex justify-center gap-8 p-8">
          <div className="border-e-2 border-zinc-600">
            <p className="w-80 text-zinc-400 mr-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              tempora itaque facere eveniet quasi!
            </p>
            <div className="flex gap-4 mt-6">
              <Image
                className="w-14"
                src={profileImage}
                alt="imagem de perfil"
              />
              <div className="flex flex-col text-zinc-400">
                <span className="font-semibold">John Doe ⭐️⭐️⭐️⭐️⭐️</span>
                <span className="font-semibold">Colecionador</span>
              </div>
            </div>
          </div>
          <div className="border-e-2 border-zinc-600">
            <p className="w-80 text-zinc-400 mr-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              tempora itaque facere eveniet quasi!
            </p>
            <div className="flex gap-4 mt-6">
              <Image
                className="w-14"
                src={profileImage}
                alt="imagem de perfil"
              />
              <div className="flex flex-col text-zinc-400">
                <span className="font-semibold">John Doe ⭐️⭐️⭐️⭐️⭐️</span>
                <span className="font-semibold">Colecionador</span>
              </div>
            </div>
          </div>
          <div className="">
            <p className="w-80 text-zinc-400 mr-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              tempora itaque facere eveniet quasi!
            </p>
            <div className="flex gap-4 mt-6">
              <Image
                className="w-14"
                src={profileImage}
                alt="imagem de perfil"
              />
              <div className="flex flex-col text-zinc-400">
                <span className="font-semibold">John Doe ⭐️⭐️⭐️⭐️⭐️</span>
                <span className="font-semibold">Colecionador</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
