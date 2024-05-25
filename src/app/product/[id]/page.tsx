import { Product } from "@/types/types";
import ProductPage from "./ProductPage";
import { products } from "@/data/products";

const fetchProductById = async (id: string): Promise<Product | null> => {
  return products.find((product) => product.id === parseInt(id, 10)) || null;
};

interface ProductPageProps {
  params: { id: string };
}

const ServerProductPage = async ({ params }: ProductPageProps) => {
  const product = await fetchProductById(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductPage product={product} />;
};

// Função para gerar caminhos estáticos
export async function generateStaticParams() {
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export default ServerProductPage;
