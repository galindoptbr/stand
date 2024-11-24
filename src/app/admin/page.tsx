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
import Image from "next/image";

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  // Função fetchProducts movida para fora do useEffect para ser reutilizável
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      const productsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        // Fazendo o casting para garantir que temos todas as propriedades do tipo Product
        const product: Product = {
          id: doc.id,
          name: data.name || "Produto sem nome",
          price: data.price ? Number(data.price) : 0,
          description: data.description || "Sem descrição",
          images:
            data.images && data.images.length
              ? data.images
              : ["/placeholder.jpg"], // Usar uma imagem padrão se estiver vazio
          brand: data.brand || "Marca desconhecida",
          top: data.top || false,
        };

        return product;
      });

      setProducts(productsData);
    } catch (error) {
      console.error("Erro ao buscar os produtos: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      // Primeiro fazer upload das novas imagens e obter URLs
      let imageUrls = previewImages;

      if (images.length > 0) {
        imageUrls = await Promise.all(
          images.map(async (image) => {
            const storageRef = ref(
              storage,
              `products/${image.name}-${Date.now()}`
            );
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);
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

      if (editId) {
        const productRef = doc(db, "products", editId);
        await updateDoc(productRef, productData);
        setEditId(null);
      } else {
        await addDoc(collection(db, "products"), productData);
      }

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
    setImages([]);
    setPreviewImages(product.images);
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

      {/* Lista de Produtos estilizada como ProductList */}
      <div className="mt-8 max-w-[1200px] m-auto">
        <h2 className="text-3xl font-semibold text-center mb-4">
          Produtos Cadastrados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 lg:p-0">
          {products.map((product) => (
            <div key={product.id} className="bg-zinc-300 rounded-lg p-4">
              {product.images && product.images.length > 0 && (
                <Image
                  src={product.images[0]}
                  alt={`Imagem do produto ${product.name}`}
                  width={300}
                  height={300}
                  className="w-full object-contain rounded"
                  priority
                />
              )}
              <div className="flex flex-col items-center mt-4">
                <h3 className="text-2xl font-bold text-zinc-700">{product.name}</h3>
                <p className="text-zinc-500 pt-2">{product.brand}</p>
                <p className="mt-2 text-lg font-semibold text-green-500">
                  € {product.price.toFixed(2)}
                </p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-yellow-500 text-white p-3 rounded-md font-bold"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white p-2 rounded-md font-bold"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
