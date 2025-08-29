export interface BrandDto {
  id: number;
  name: string;
  country: string;
  description: string;
  website: string;
}

export type CreateBrandDto = Omit<BrandDto, "id">;

export type BrandNameDto = Pick<BrandDto, "id" | "name">;