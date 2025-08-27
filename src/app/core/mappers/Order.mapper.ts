import { OrderDisplayDto, OrderStatus as OrderStatusDto } from "../../pages/admin-orders/DTOs/OrderDto";
import { OrderStatus } from "../enums/OrderStatus";
import { Order } from "../models/Order.model";


export class OrderMapper{
    public static toModal(orderDto: OrderDisplayDto): Order{
        return {
            id: orderDto.id,
            orderDate: orderDto.orderDate,
            orderStatus: OrderMapper.toModalEnum(orderDto.orderStatus),
            items: orderDto.items,
        }
    }

    public static toModalEnum(orderStatus: OrderStatusDto): OrderStatus{
        switch(orderStatus){
            case OrderStatusDto.Pending:
                return OrderStatus.Pending;
            case OrderStatusDto.Delivered:
                return OrderStatus.Delivered;
            case OrderStatusDto.Denied:
                return OrderStatus.Denied;
            case OrderStatusDto.Shipped:
                return OrderStatus.Shipped;
            default:
                throw new Error("Unknown status");
        }
    }
}