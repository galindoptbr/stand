import { StaticImageData } from "next/image";

export type ImageType = string | StaticImageData;

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  brand: string;
  colors?: string[];
  diameters?: string[];
  top?: boolean;
}
