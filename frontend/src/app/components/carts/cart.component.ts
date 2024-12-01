import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId = '123'; // 假设当前用户 ID 为 123

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart(this.userId).subscribe(
      (data) => {
        this.cartItems = data.items;
      },
      (error) => {
        console.error('Error loading cart:', error);
      }
    );
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(this.userId, productId).subscribe(
      () => {
        this.loadCart(); // 重新加载购物车
      },
      (error) => {
        console.error('Error removing item:', error);
      }
    );
  }
}
