import { StaticImageData } from "next/image";

export type ImageType = string | StaticImageData;

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: ImageType;
  brand: string;
}
