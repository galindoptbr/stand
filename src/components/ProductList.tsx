import React from "react";
import { Product } from "@/types/types";
import Image from "next/image";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className=" max-w-[1200px] m-auto">
      <h1 className="font-bold px-4 mt-6 text-2xl text-center">
        Lista de Produtos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="mt-2 text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-2 text-lg font-semibold">
            {product.price.toFixed(2)} €
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
