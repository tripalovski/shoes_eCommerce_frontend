export interface OrderItemDto {
  footwearId: number;
  quantity: number;
}

export interface OrderDto {
  items: OrderItemDto[];
}