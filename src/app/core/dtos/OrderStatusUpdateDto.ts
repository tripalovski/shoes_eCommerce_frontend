import { OrderStatusDto } from "../../pages/admin-orders/DTOs/OrderDto";

export interface OrderStatusUpdateDto{
    id: number,
    status: OrderStatusDto 
}