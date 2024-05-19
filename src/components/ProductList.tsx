"use client";

import React, { useState } from "react";
import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className=" max-w-[1200px] m-auto">
      <p className="font-semibold px-4 mt-16 text-md text-center">
        Lista de Produtos
      </p>
      <h1 className="text-center text-5xl font-bold">As mais pedidas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
        {currentProducts.map((product) => (
          <Link key={product.id} href={`/productpage/${product.id}`} passHref>
            <div className="bg-zinc-900 rounded-lg p-4 cursor-pointer">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full bg-contain rounded"
                priority
              />
              <div className="flex flex-col items-center">
                <p className="text-zinc-400 pt-2">{product.brand}</p>
                <h2 className="mt-2 text-2xl font-bold">{product.name}</h2>
                <p className="mt-2 text-lg font-semibold">
                  € {product.price.toFixed(2)}
                </p>
                <button className="bg-yellow-400 hover:bg-yellow-300 p-2 rounded-full text-zinc-900 font-bold w-48 mt-4">
                  <span>VER PRODUTO</span>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              index + 1 === currentPage
                ? "bg-yellow-500 text-zinc-800"
                : "bg-zinc-800 text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
