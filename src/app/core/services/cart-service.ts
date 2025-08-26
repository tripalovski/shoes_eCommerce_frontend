import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/Footwear.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
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
}