import { Component, inject } from '@angular/core';
import { Order } from '../../core/models/Order.model';
import { OrderStatus } from '../../core/enums/OrderStatus';
import { OrderService } from '../../core/services/order-service';
import { OrderDisplay } from '../../shared/components/order-display/order-display';

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

  private orderService = inject(OrderService);

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
