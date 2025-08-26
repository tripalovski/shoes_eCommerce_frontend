import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { OrderService } from '../../../core/services/order-service';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  orderService = inject(OrderService);

  
  checkout(): void {
    if (this.orderService.getTotal() > 0) {
      alert('Kupovina završena!');
      this.orderService.checkout().subscribe({
        next: () => {
          this.orderService.clearCart();
        },
        error: (err) => {
          console.error('Error checkouting cart', err);
          alert('Checkouting failed. Check console for details.');
        }
      });
    } else {
      alert('Korpa je prazna.');
    }
  }
}
