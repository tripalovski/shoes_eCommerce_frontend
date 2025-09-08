import { OrderStatus } from "../../../core/enums/OrderStatus";

export interface IOrderStatusUpdate{
    id: number,
    status: OrderStatus 
}