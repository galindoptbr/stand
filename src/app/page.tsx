import { Banner } from "@/components/Banner";
import ProductList from "@/components/ProductList";
import { products } from "../data/products";
import { NextPage } from "next";


const Home: NextPage = () => {
  return (
    <>
      <div>
        <Banner />
        <ProductList products={products} />
      </div>
    </>
  );
};

export default Home;
