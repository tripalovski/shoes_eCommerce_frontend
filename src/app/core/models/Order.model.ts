import { OrderStatus } from "../enums/OrderStatus";

export interface OrderItem {
  footwearId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  createdAtDate: string;
  status: OrderStatus;
  items: OrderItem[];
}