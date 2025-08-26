import { Component, inject } from '@angular/core';
import { OrderDisplayDto } from './DTOs/OrderDto';
import { OrderService } from '../../core/services/order-service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css'
})
export class AdminOrders {
  orders: OrderDisplayDto[] = [];
  isLoading = true;

  private orderService = inject(OrderService);

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe({
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
