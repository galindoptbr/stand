"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const productsPerPage = 12;

  const pathname = usePathname();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
  
        const productsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
  
          // Fazendo o casting para garantir que temos todas as propriedades do tipo Product
          const product: Product = {
            id: doc.id, // Usando o `doc.id` para atribuir um ID único do documento
            name: data.name || "Produto sem nome",
            price: data.price ? Number(data.price) : 0, // Certifique-se que `price` seja numérico
            description: data.description || "Sem descrição",
            images: data.images && data.images.length ? data.images : ["/placeholder.jpg"], // Usar uma imagem padrão se estiver vazio
            brand: data.brand || "Marca desconhecida",
            top: data.top || false,
          };
  
          return product;
        });
  
        setProducts(productsData);
      } catch (error) {
        console.error("Erro ao buscar os produtos: ", error);
      }
    };
  
    fetchProducts();
  }, []);
  

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

  const brands = ["BMW", "FIAT", "MERCEDES", "AUDI", "OZ", "BBS", "VW"];

  return (
    <>
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
              <div className="bg-zinc-300 rounded-lg p-4 cursor-pointer">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full bg-contain rounded"
                  priority
                />
                <div className="flex flex-col items-center">
                  <p className="text-zinc-500 pt-2">{product.brand}</p>
                  <h2 className="mt-2 text-2xl font-bold">{product.name}</h2>
                  <p className="mt-2 text-lg font-semibold text-green-500">
                    € {product.price.toFixed(2)}
                  </p>
                  <button className="bg-red-500 hover:bg-zinc-700 p-2 rounded-md font-bold w-48 mt-4">
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
