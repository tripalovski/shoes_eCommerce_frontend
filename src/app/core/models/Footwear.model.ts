export interface Footwear {
  id: number;
  name: string;
  brand: string;
  price: number;
  color: string;
  size: string;
  stock: number;
  description: string;
  imageUrl: string;
}

export type CreateFootwearDto = Omit<Footwear, "id" | "brand"> & {
  brandId: number;
}

export type UpdateFootwearDto = Omit<Footwear, "brand"> & {
  brandId: number;
}

export type CartItem = Pick<Footwear, "id" | "name" | "price"> & {
  quantity: number;
}