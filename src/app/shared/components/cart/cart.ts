import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart-service';
import { OrderService } from '../../../core/services/order-service';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  cartService = inject(CartService);
  orderService = inject(OrderService);

  
  checkout(): void {
    if (this.cartService.getTotal() > 0) {
      alert('Kupovina završena!');
      this.orderService.checkout().subscribe({
        next: () => {
          this.cartService.clearCart();
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
