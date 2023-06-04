import { Picture } from './picture';

export interface Product {
  id: number;
  title: string;
  price: number;
  slug: string;
  description: string;
  images: Picture[];
}
