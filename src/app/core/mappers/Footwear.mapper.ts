import { CreateFootwearDto, FootwearDto, PostFootwearDto } from "../dtos/FootwearDto";
import { Footwear } from "../models/Footwear.model";

export class FootwearMappper{
    public static toModel(footwearDto: FootwearDto): Footwear{
        return{
            id: footwearDto.id,
            name: footwearDto.name,
            brand: footwearDto.brand,
            price: footwearDto.price,
            color: footwearDto.color,
            size: footwearDto.size,
            stock: footwearDto.stock,
            description: footwearDto.description,
            imageUrl: footwearDto.imageUrl
        }
    }

    public static toDto(footwear: Footwear, brandId: number): PostFootwearDto{
        return{
            id: footwear.id,
            name: footwear.name,
            brandId: brandId,
            price: footwear.price,
            color: footwear.color,
            size: footwear.size,
            stock: footwear.stock,
            description: footwear.description,
            imageUrl: footwear.imageUrl
        }
    }

    public static toCreateDto(footwear: Footwear, brandId: number): CreateFootwearDto{
        return{
            name: footwear.name,
            brandId: brandId,
            price: footwear.price,
            color: footwear.color,
            size: footwear.size,
            stock: footwear.stock,
            description: footwear.description,
            imageUrl: footwear.imageUrl
        }
    }
}