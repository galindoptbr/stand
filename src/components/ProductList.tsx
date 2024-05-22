"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const productsPerPage = 12;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setSelectedBrand(null);
    setCurrentPage(1);
  };

  const filteredProducts = selectedBrand
    ? products.filter((product) => product.brand === selectedBrand)
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-[1200px] m-auto mt-20">
      <div>
        <h1 className="text-center text-5xl font-bold mt-6">
          Catalogo de produtos
        </h1>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleResetFilter}
          className="p-3 bg-red-500 w-24 rounded text-[#232323]"
        >
          <span className="font-bold">TODOS</span>
        </button>
        {["BMW", "MERCEDES", "AUDI", "OZ", "BBS"].map((brand) => (
          <button
            key={brand}
            onClick={() => handleBrandClick(brand)}
            className={`p-3 w-28 rounded ${
              selectedBrand === brand
                ? "bg-yellow-500 text-zinc-800"
                : "bg-[#282828] text-white"
            }`}
          >
            <span className="font-bold">{brand}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
        {currentProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} passHref>
            <div className="bg-[#282828] rounded-lg p-4 cursor-pointer">
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
                <button className="bg-black hover:bg-zinc-700 p-2 rounded-full font-bold w-48 mt-4">
                  <span className="text-white">VER PRODUTO</span>
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
