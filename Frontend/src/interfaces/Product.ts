import { CategoryI } from "./Category";

export interface ProductI {
  _id?: string;
  title: string;
  price: number;
  category?: CategoryI;
  description?: string;
  thumbnail?: string;
  images?: string[];
  stock: number;
}
