export interface OrderItemDisplayDto {
  footwearId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderDisplayDto {
  id: number;
  createdAtDate: string;
  status: OrderStatusDto;
  items: OrderItemDisplayDto[];
}

export enum OrderStatusDto {
  Pending = 0,
  Accepted = 1,
  Denied = 2
}