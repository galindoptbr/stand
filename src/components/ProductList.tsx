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
  const productsPerPage = 9;

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
      <h1 className="font-bold px-4 mt-6 text-2xl text-center">
        Lista de Produtos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
        {currentProducts.map((product) => (
          <Link key={product.id} href={`/productpage/${product.id}`} passHref>
            <div className="bg-zinc-800 rounded-lg p-4 cursor-pointer">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded"
                priority
              />
              <h2 className="mt-2 text-xl font-bold">{product.name}</h2>
              <p className="text-gray-400">{product.description}</p>
              <p className="mt-2 text-lg font-semibold">
                {product.price.toFixed(2)} €
              </p>
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
