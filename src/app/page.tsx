
import { Banner } from "@/components/Banner";
import ProductList from "@/components/ProductList";
import { products } from "../data/products";
import { NextPage } from "next";
import { Footer } from "@/components/Footer";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Banner />
        <ProductList products={products} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
