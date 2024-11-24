import { NextPage } from "next";
import { Banner } from "@/components/Banner";
import ProductTrend from "@/components/ProductTrend";
import { MiniBanners } from "@/components/MiniBanners";
import { Depositions } from "@/components/Depositions";
import ProductList from "@/components/ProductList";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Banner />
        <MiniBanners />
        <ProductList />
        <Depositions />
      </div>
    </>
  );
};

export default Home;
