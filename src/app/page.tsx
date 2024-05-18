import { Banner } from "@/components/Banner";
import { Navbar } from "@/components/Navbar";
import ProductList from "@/components/ProductList";
import { products } from "../data/products";
import { NextPage } from "next";
import { Footer } from "@/components/Footer";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Navbar />
        <Banner />
        <ProductList products={products} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
