"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const productsPerPage = 12;

  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(event.target.value);
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

  const brands = ["BMW", "MERCEDES", "AUDI", "OZ", "BBS", "VW"];

  return (
    <>
      <div className="flex gap-2 pt-10 pl-10  m-auto max-w-[1200px] ">
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
              Catálogo
            </Link>
          </li>
        </ul>
      </div>
      <div className="max-w-[1200px] m-auto">
        <div className="flex flex-col text-center mt-12">
          <p className="text-3xl font-semibold">Catálogo de produtos</p>
          <p className="text-zinc-400">
            Conheça todos os nossos produtos ou pesquise por marcas.
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <select
            onChange={handleBrandChange}
            value={selectedBrand || ""}
            className="p-3 bg-[#282828] text-yellow-500 font-bold rounded w-80"
          >
            <option value="">TODOS</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 p-2 lg:p-0">
          {currentProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} passHref>
              <div className="bg-[#282828] rounded-lg p-4 cursor-pointer">
                <Image
                  src={product.images[0]}
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
    </>
  );
};

export default ProductList;
