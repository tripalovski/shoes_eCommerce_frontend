import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { OrderDto, OrderItemDto } from '../../pages/Shop/DTOs/OrderDto';
import { ServiceConstants } from '../constants/ServiceConstants';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/CartItem';
import { OrderDisplayDto } from '../../pages/admin-orders/DTOs/OrderDto';
import { Order } from '../models/Order.model';
import { OrderMapper } from '../mappers/Order.mapper';
import { OrderStatusUpdateDto } from '../dtos/OrderStatusUpdateDto';
import { IOrderStatusUpdate } from '../../pages/admin-orders/interfaces/IOrderStatusUpdate.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient)

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartSubject.getValue()));
    
  }

  private loadCartFromLocalStorage(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartSubject.next(JSON.parse(cart));
    }
  }

  addItem(shoe: CartItem, quantity: number): void {    
    const currentCart = this.cartSubject.getValue();
    const existingItem = currentCart.find(item => item.id === shoe.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartSubject.next([...currentCart, { ...shoe, quantity }]);
    }
    this.saveCartToLocalStorage();
  }

  decreaseItemQuantity(shoeId: number, quantity: number){
    const currentCart = this.cartSubject.getValue();
    const selectedItem = currentCart.find(item => item.id === shoeId);
    if(selectedItem){
      selectedItem.quantity -= quantity;
      if(selectedItem.quantity === 0){
        this.removeItem(shoeId);
      } else {
        this.saveCartToLocalStorage();
      }
    }
  }

  removeItem(shoeId: number): void {
    const currentCart = this.cartSubject.getValue();
    const newCart = currentCart.filter(item => item.id !== shoeId);
    this.cartSubject.next(newCart);
    this.saveCartToLocalStorage();
  }

  clearCart(): void {
    this.cartSubject.next([]);
    this.saveCartToLocalStorage();
  }

  getTotal(): number {
    return this.cartSubject.getValue().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  checkout(): Observable<any> {
    const currentCart = this.cartSubject.getValue();
    
    const orderItems: OrderItemDto[] = currentCart.map(item => ({
      footwearId: item.id,
      quantity: item.quantity
    }));

    const orderDto: OrderDto = { items: orderItems };

    return this.http.post(ServiceConstants.API_METHODS.ORDER.CREATE, orderDto);
  }


  // HTTP Requests

  getOrders(): Observable<Order[]> {
    return this.http.get<OrderDisplayDto[]>(ServiceConstants.API_METHODS.ORDER.GET_ALL).pipe(
      map(dtos => dtos.map(dto => OrderMapper.toModal(dto)))
    );
  }

  updateStatus(statusUpdate: IOrderStatusUpdate){
    const statusUpdateDto: OrderStatusUpdateDto = OrderMapper.StatusUpdateToDto(statusUpdate);
    return this.http.patch(ServiceConstants.API_METHODS.ORDER.PATCH_STATUS(statusUpdateDto.id), statusUpdateDto);
  } 

  deleteOrder(orderId: number): Observable<any> {
      return this.http.delete(ServiceConstants.API_METHODS.ORDER.DELETE(orderId));
  }
}