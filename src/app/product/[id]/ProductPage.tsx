"use client";

import { Product } from "@/types/types";
import Image from "next/image";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { SlLocationPin, SlPrinter } from "react-icons/sl";

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="bg-[#282828] mt-28">
        <div className="flex max-w-[1200px] m-auto p-4">
          <div className="w-1/2">
            <Image
              src={product.image}
              alt={product.name}
              width={2000}
              height={2000}
              className="w-[2000px] rounded"
              priority
            />
          </div>
          <div className="flex flex-col w-1/2 m-auto px-10">
            <p className="mb-2 text-zinc-500">{product.brand}</p>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-3xl font-semibold mb-4">
              € {product.price?.toFixed(2)}
            </p>
            <p className="text-lg mb-6">{product.description}</p>
            {product.colors && (
              <div className="flex items-center mb-6">
                <strong className="mr-4">Cores:</strong>
                <div className="flex gap-2 mt-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
            {product.diameters && (
              <div className="flex items-center mb-10">
                <strong className="mr-4">Diâmetros:</strong>
                <div className="flex gap-2 mt-2">
                  {product.diameters.map((diameter, index) => (
                    <p
                      className="p-1 w-14 rounded text-center font-semibold bg-zinc-900"
                      key={index}
                    >
                      {diameter}
                    </p>
                  ))}
                </div>
              </div>
            )}
            <a
              href="https://wa.link/5jbbft"
              target="_blank"
              className="inline-block"
            >
              <button className=" flex items-center justify-center gap-2 bg-green-600 p-2 rounded-full w-full m-auto">
                <FaWhatsapp />
                <span className="font-semibold">Fazer pedido</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
