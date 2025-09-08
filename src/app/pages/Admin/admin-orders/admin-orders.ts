import { Component, inject } from '@angular/core';
import { IOrderStatusUpdate } from './IOrderStatusUpdate.interface';
import { OrderDisplay } from '../../../shared/components/order-display/order-display';
import { Order } from '../../../core/models/Order.model';
import { OrderStatus } from '../../../core/enums/OrderStatus';
import { OrderService } from '../../../core/services/order-service';

@Component({
  selector: 'app-admin-orders',
  imports: [ OrderDisplay],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css'
})
export class AdminOrders {
  orders: Order[] = [];
  isLoading = true;
  public readonly OrderStatus = OrderStatus;

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

  updateStatus(orderId: number, status: OrderStatus){
    const statusUpdate: IOrderStatusUpdate = {
      id: orderId,
      status: status
    }    
    this.orderService.updateStatus( statusUpdate).subscribe({
      next: () => {
        console.log("Status is updated");
        this.getOrders();
      },
      error(err){
        console.log("Error: status isnt updated");
      }
    });
  }

  deleteOrder(id: number): void {
    if (confirm('Jeste li sigurni da želite obrisati ovu narudžbinu?')) {
      this.orderService.deleteOrder(id).subscribe({
        next: () => {
          this.getOrders();
        },
        error: (err) => {
          console.error('Došlo je do greške prilikom brisanja narudžbine:', err);
        }
      });
    }
  }

  removeItemFromOrder(orderId: number, footwearId: number){
    this.orderService.removeItemFromOrder(orderId, footwearId).subscribe({
      next: () => {
        this.getOrders();
      },
      error(err){
        console.error("Error: item wasnt removed", err);
      }
    })
  }
}
