import { StaticImageData } from "next/image";

export type ImageType = string | StaticImageData;

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: ImageType[];
  brand: string;
  colors?: string[];
  diameters?: string[];
  top?: boolean;
}
