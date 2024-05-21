import ProductList from "@/components/ProductList";
import { products } from "@/data/products";
import React from "react";

const Catalog = () => {
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default Catalog;
