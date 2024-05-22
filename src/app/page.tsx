
import { products } from "../data/products";
import { NextPage } from "next";
import { Banner } from "@/components/Banner";
import ProductTrend from "@/components/ProductTrend";
import { MiniBanners } from "@/components/MiniBanners";
import { Depositions } from "@/components/Depositions";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Banner />
        <MiniBanners />
        <ProductTrend products={products} />
        <Depositions />
      </div>
    </>
  );
};

export default Home;
