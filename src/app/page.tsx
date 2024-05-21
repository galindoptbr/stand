
import { products } from "../data/products";
import { NextPage } from "next";
import { Banner } from "@/components/Banner";
import ProductTrend from "@/components/ProductTrend";
import { MiniBanners } from "@/components/MiniBanners";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Banner />
        <MiniBanners />
        <ProductTrend products={products} />
      </div>
    </>
  );
};

export default Home;
