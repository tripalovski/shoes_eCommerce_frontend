import { IOrderStatusUpdate } from "../../pages/Admin/admin-orders/IOrderStatusUpdate.interface";
import { OrderDisplayDto, OrderItemDto, OrderStatusDto } from "../dtos/OrderDto";
import { OrderStatusUpdateDto } from "../dtos/OrderStatusUpdateDto";
import { OrderStatus } from "../enums/OrderStatus";
import { CartItem } from "../models/CartItem";
import { Order } from "../models/Order.model";


export class OrderMapper{
    public static toModal(orderDto: OrderDisplayDto): Order{
        return {
            id: orderDto.id,
            createdAtDate: orderDto.createdAtDate,
            status: OrderMapper.toModalEnum(orderDto.status),
            items: orderDto.items,
        }
    }

    public static StatusUpdateToDto(orderStatusUpdate: IOrderStatusUpdate): OrderStatusUpdateDto{
        return {
            id: orderStatusUpdate.id,
            status: OrderMapper.toDtoEnum(orderStatusUpdate.status)
        } as OrderStatusUpdateDto
    }

    public static toModalEnum(orderStatus: OrderStatusDto): OrderStatus{
        switch(orderStatus){
            case OrderStatusDto.Pending:
                return OrderStatus.Pending;
            case OrderStatusDto.Denied:
                return OrderStatus.Denied;
            case OrderStatusDto.Accepted:
                return OrderStatus.Accepted;
            default:
                throw new Error("Unknown status" + orderStatus);
        }
    }
    
    public static toDtoEnum(orderStatus: OrderStatus): OrderStatusDto{
        switch(orderStatus){
            case OrderStatus.Pending:
                return OrderStatusDto.Pending;
            case OrderStatus.Denied:
                return OrderStatusDto.Denied;
            case OrderStatus.Accepted:
                return OrderStatusDto.Accepted;
            default:
                throw new Error("Unknown status");
        }
    }

    public static toItemDto(cartItem: CartItem): OrderItemDto{
        return {
            footwearId: cartItem.id,
            quantity: cartItem.quantity
        }
    }
}