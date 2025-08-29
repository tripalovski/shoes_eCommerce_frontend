import { BrandDto, CreateBrandDto } from "../dtos/BrandDto";
import { Brand } from "../models/Brand.model";

export class BrandMapper{
    public static toModal(brandDto: BrandDto): Brand{
        return {
            id: brandDto.id,
            name: brandDto.name,
            country: brandDto.country,
            description: brandDto.description,
            website: brandDto.website
        }
    }

    public static toDto(brand: Brand): BrandDto{
        return {
            id: brand.id,
            name: brand.name,
            country: brand.country,
            description: brand.description,
            website: brand.website
        }
    }

    public static toCreateDto(brand: Brand): CreateBrandDto{
        return {
            name: brand.name,
            country: brand.country,
            description: brand.description,
            website: brand.website
        }
    }
}