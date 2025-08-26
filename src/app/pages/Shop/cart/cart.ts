import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  cartService = inject(CartService);

  
  checkout(): void {
    if (this.cartService.getTotal() > 0) {
      alert('Kupovina završena!');
      this.cartService.clearCart();
    } else {
      alert('Korpa je prazna.');
    }
  }
}
