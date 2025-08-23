export interface Brand {
  id: number;
  name: string;
  country: string;
  description: string;
  website: string;
}

export type SelectBrandDto = Pick<Brand, "id" | "name">;