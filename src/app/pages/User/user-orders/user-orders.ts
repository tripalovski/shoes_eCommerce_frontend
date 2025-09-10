import { Component, inject } from '@angular/core';
import { OrderDisplay } from '../../../shared/components/order-display/order-display';
import { Order } from '../../../core/models/Order.model';
import { OrderStatus } from '../../../core/enums/OrderStatus';
import { OrderService } from '../../../core/services/order-service';

@Component({
  selector: 'app-user-orders',
  imports: [OrderDisplay],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.css'
})
export class UserOrders {
    orders: Order[] = [];
  isLoading = true;
  public readonly OrderStatus = OrderStatus; // to be visible in html

  private _orderService = inject(OrderService);
  public get orderService() {
    return this._orderService;
  }
  public set orderService(value) {
    this._orderService = value;
  }

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(): void {
    this.orderService.getUserOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
        this.isLoading = false;
      }
    });
  }
}
