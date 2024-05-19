import { GetStaticPropsContext } from "next";
import { Product } from "@/types/types";
import ProductPage from "./ProductPage";
import { products } from "@/data/products";

const fetchProductById = async (id: string): Promise<Product | null> => {
  return products.find((product) => product.id === parseInt(id, 10)) || null;
};

interface ServerProductPageProps {
  params: { id: string };
}

const ServerProductPage: React.FC<ServerProductPageProps> = async ({ params }) => {
  const product = await fetchProductById(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductPage product={product} />;
};

// Função para gerar caminhos estáticos
export async function generateStaticParams() {
  const paths = products.map((product) => ({
    id: String(product.id),
  }));

  return paths;
}

// Função para buscar dados estáticos
export async function generateStaticProps({ params }: GetStaticPropsContext) {
  const id = params?.id as string;
  const product = await fetchProductById(id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { params },
  };
}

export default ServerProductPage;
