import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrderDto, OrderItemDto } from '../../pages/Shop/DTOs/OrderDto';
import { ServiceConstants } from '../constants/ServiceConstants';
import { HttpClient } from '@angular/common/http';
import { OrderDisplayDto } from '../../pages/admin-orders/DTOs/OrderDto';
import { Order } from '../models/Order.model';
import { OrderMapper } from '../mappers/Order.mapper';
import { OrderStatusUpdateDto } from '../dtos/OrderStatusUpdateDto';
import { IOrderStatusUpdate } from '../../pages/admin-orders/interfaces/IOrderStatusUpdate.interface';
import { CartService } from './cart-service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient)
  cartService = inject(CartService);


  checkout(): Observable<any> {
    const currentCart = this.cartService.getCartValue();
    const orderItems: OrderItemDto[] = currentCart.map(item => OrderMapper.toItemDto(item));

    const orderDto: OrderDto = { items: orderItems };
    return this.http.post(ServiceConstants.API_METHODS.ORDER.CREATE, orderDto);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<OrderDisplayDto[]>(ServiceConstants.API_METHODS.ORDER.GET_ALL).pipe(
      map(dtos => dtos.map(dto => OrderMapper.toModal(dto)))
    );
  }

  getUserOrders(): Observable<Order[]> {
    return this.http.get<OrderDisplayDto[]>(ServiceConstants.API_METHODS.ORDER.GET_USER_ORDERS).pipe(
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

  removeItemFromOrder(orderId: number, footwearId: number){
    return this.http.delete(ServiceConstants.API_METHODS.ORDER.DELETE_ITEM(orderId, footwearId));
  }
}