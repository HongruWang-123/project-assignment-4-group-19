import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  cartUpdated$ = new BehaviorSubject<any[]>(this.cartItems);

  constructor() {
    this.loadInitialCart();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  updateCart(item: any): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.productId._id === item.productId._id);
    if (index > -1) {
      this.cartItems[index] = item;
    } else {
      this.cartItems.push(item);
    }
    this.cartUpdated$.next([...this.cartItems]);
  }

  removeItem(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.productId._id !== productId);
    this.cartUpdated$.next([...this.cartItems]);
  }

  checkout(cartItems: any[]): void {
    console.log('Checking out with items:', cartItems);
    this.cartItems = [];
    this.cartUpdated$.next([...this.cartItems]);
    localStorage.removeItem('cart');
  }

  private loadInitialCart(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartUpdated$.next([...this.cartItems]);
    }
  }
}