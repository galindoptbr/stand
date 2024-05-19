import { GetStaticPaths, GetStaticProps } from "next";
import { Product } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/router";
import { products } from "@/data/products";

const fetchProductById = async (id: string): Promise<Product | null> => {
  return products.find((product) => product.id === parseInt(id, 10)) || null;
};

interface ProductPageProps {
  product: Product | null;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const router = useRouter();

  if (router.isFallback || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1200px] m-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={600}
        className="w-full h-auto object-cover rounded mb-4"
        priority
      />
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-2xl font-semibold">{product.price.toFixed(2)} €</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { id: String(product.id) },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const product = await fetchProductById(id);

  return {
    props: { product },
  };
};

export default ProductPage;
