export interface OrderItemDisplayDto {
  footwearId: number;
  name: string; // Dodato
  price: number; // Dodato
  quantity: number;
}

export interface OrderDisplayDto {
  id: number;
  orderDate: string;
  items: OrderItemDisplayDto[];
}
