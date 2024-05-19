"use client";

import { Product } from "@/types/types";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="bg-black mt-48">
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
            <p className="mb-4 text-zinc-500">{product.brand}</p>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-semibold mb-6">
              € {product.price?.toFixed(2)}
            </p>
            <p className="text-lg mb-6">{product.description}</p>
            <a href="https://wa.link/5jbbft" target="_blank" className="inline-block">
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
