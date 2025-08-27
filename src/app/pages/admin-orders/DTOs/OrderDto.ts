export interface OrderItemDisplayDto {
  footwearId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderDisplayDto {
  id: number;
  orderDate: string;
  orderStatus: OrderStatus;
  items: OrderItemDisplayDto[];
}

export enum OrderStatus {
  Pending = 0,
  Shipped = 1,
  Delivered = 2,
  Denied = 3
}