export interface FootwearDto {
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

export type PostFootwearDto = Omit<FootwearDto, "brand"> & {
    brandId: number;
};

export type CreateFootwearDto = Omit<FootwearDto, "id" | "brand"> & {
  brandId: number;
}

export type UpdateFootwearDto = Omit<FootwearDto, "brand"> & {
  brandId: number;
}
