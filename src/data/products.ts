import { Product } from "@/types/types";

import A058_01 from "@/assets/images/058/058_001.png";
import A058_02 from "@/assets/images/058/058_002.png";
import A058_03 from "@/assets/images/058/058_003.png";
import A058_04 from "@/assets/images/058/058_004.png";
import A121_01 from "@/assets/images/121/121_001.png";
import A121_02 from "@/assets/images/121/121_002.png";
import A121_03 from "@/assets/images/121/121_003.png";
import A121_04 from "@/assets/images/121/121_004.png";

export const products: Product[] = [
  {
    id: 121,
    name: "MiniLite",
    price: 3,
    description: "teste",
    images: [A121_01, A121_02, A121_03, A121_04],
    brand: "Datsun",
    colors: ["#000000", "#ffffff", "#daa520", "#bfbfbf", "#B87333"],
    diameters: ["11"],
    top: true,
  },

  {
    id: 58,
    name: "Watanabe",
    price: 3,
    description:
      "As rodas Watanabe em escala 1:64 são uma réplica detalhada e autêntica das icônicas rodas Watanabe utilizadas em carros clássicos japoneses. Com acabamento de alta qualidade e design fiel ao original, essas miniaturas são perfeitas para colecionadores e entusiastas de modelismo que buscam adicionar um toque de realismo e estilo aos seus veículos em miniatura.",
    images: [A058_01, A058_02, A058_03, A058_04],
    brand: "GISA",
    colors: ["#000000", "#ffffff", "#daa520", "#bfbfbf", "#B87333"],
    diameters: ["10", "11"],
    top: true,
  },
];
