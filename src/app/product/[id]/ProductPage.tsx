"use client";

import { useState } from "react";
import { Product, ImageType } from "@/types/types";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProductTrend from "@/components/ProductTrend";
import { products } from "@/data/products";

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const pathname = usePathname();
  const [mainImage, setMainImage] = useState<ImageType>(product.images[0]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="flex gap-2 p-10 m-auto max-w-[1200px] ">
        <ul className="flex gap-2">
          <li>
            <Link
              href="/"
              replace
              className={`transition-colors duration-300 ${
                pathname === "/"
                  ? "text-yellow-500"
                  : "text-zinc-400 hover:text-yellow-500"
              }`}
            >
              Início /
            </Link>
          </li>
          <li>
            <Link
              href="/catalog"
              className={`transition-colors duration-300 ${
                pathname === "/catalog"
                  ? "text-yellow-500"
                  : "text-zinc-400 hover:text-yellow-500"
              }`}
            >
              Catálogo /
            </Link>
          </li>
        </ul>
        <p className="text-zinc-400">{product.name}</p>
      </div>
      <div className="bg-[#282828]">
        <div className="flex max-w-[1200px] m-auto p-4">
          <div className="w-1/2">
            <Image
              src={mainImage}
              alt={product.name}
              width={2000}
              height={2000}
              className="w-full rounded"
              priority
            />
            <div className="flex mt-4 gap-2">
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className={`w-20 h-20 object-cover rounded cursor-pointer ${
                    mainImage === image
                      ? "border-2 border-yellow-500"
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col w-1/2 mt-5 px-10 border-s-2 border-zinc-700">
            <p className="mb-2 text-zinc-500">{product.brand}</p>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="mb-3 text-sm">⭐️⭐️⭐️⭐️⭐️</p>
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
              <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 transition-colors duration-300 p-2 rounded-full w-full m-auto">
                <FaWhatsapp />
                <span className="font-semibold">Fazer pedido</span>
              </button>
            </a>
            <div className="flex flex-col gap-2 mt-8">
              <p className="font-semibold text-zinc-400">
                Portes Grátis para pedidos acima de 5 unidades/sets!
              </p>
              <span className="flex items-center gap-3 text-zinc-400">
                <IoShieldCheckmark size={15} />
                <p>Satisfação garantida</p>
              </span>
              <span className="flex items-center gap-3 text-zinc-400">
                <IoShieldCheckmark size={15} />
                <p>Reembolsos sem complicações</p>
              </span>
              <span className="flex items-center gap-3 text-zinc-400">
                <IoShieldCheckmark size={15} />
                <p>Pagamentos Seguros</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ProductTrend products={products} />
    </>
  );
};

export default ProductPage;
