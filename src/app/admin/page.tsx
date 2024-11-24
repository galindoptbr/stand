"use client";

import React, { useEffect, useState } from "react";
import { db, storage } from "@/services/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Product } from "@/types/types";

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  // Buscar todos os produtos ao montar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error("Erro ao buscar os produtos: ", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      console.log("Iniciando a função handleAddProduct");

      // Primeiro fazer upload das novas imagens e obter URLs
      let imageUrls = previewImages; // Inicialmente usar as URLs existentes (se for edição)

      if (images.length > 0) {
        console.log("Imagens selecionadas para upload:", images);

        // Fazer upload das novas imagens e substituir as URLs
        imageUrls = await Promise.all(
          images.map(async (image) => {
            const storageRef = ref(
              storage,
              `products/${image.name}-${Date.now()}`
            );
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);
            console.log("URL da imagem carregada:", url);
            return url;
          })
        );
      }

      const productData = {
        name,
        price: Number(price),
        description,
        brand,
        images: imageUrls,
        top: false,
      };

      console.log("Dados do produto que serão enviados:", productData);

      if (editId) {
        // Editando um produto existente
        console.log("Editando produto com ID:", editId);
        const productRef = doc(db, "products", editId);
        await updateDoc(productRef, productData);
        setEditId(null);
      } else {
        // Adicionando um novo produto
        console.log("Adicionando um novo produto");
        await addDoc(collection(db, "products"), productData);
      }

      // Atualizar lista de produtos
      console.log("Atualizando lista de produtos");
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Erro ao cadastrar o produto:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Erro ao deletar o produto: ", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setBrand(product.brand);
    setImages([]); // Resetar as imagens porque não podemos manter o File aqui
    setPreviewImages(product.images); // Usar as URLs existentes como pré-visualização
    setEditId(product.id);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setBrand("");
    setImages([]);
    setPreviewImages([]);
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Cadastro de Produtos</h1>
      <input
        type="text"
        placeholder="Nome do Produto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 mb-2 block"
      />
      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="p-2 mb-2 block"
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 mb-2 block"
      />
      <input
        type="text"
        placeholder="Marca"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="p-2 mb-2 block"
      />
      <input
        type="file"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            const files = Array.from(e.target.files);
            setImages(files);

            // Gerar URLs de pré-visualização para as novas imagens
            const previews = files.map((file) => URL.createObjectURL(file));
            setPreviewImages(previews);
          }
        }}
        className="p-2 mb-2 block"
      />

      {/* Pré-visualização das Imagens */}
      {previewImages.length > 0 && (
        <div className="flex gap-2 mt-4">
          {previewImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Pré-visualização ${index + 1}`}
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>
      )}
      <button
        onClick={handleAddProduct}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        {editId ? "Atualizar Produto" : "Adicionar Produto"}
      </button>

      {/* Lista de Produtos */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Produtos Cadastrados</h2>
        {products.map((product) => (
          <div key={product.id} className="mb-4 p-4 border border-gray-200">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>Preço: € {product.price.toFixed(2)}</p>
            <p>Marca: {product.brand}</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleEditProduct(product)}
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
