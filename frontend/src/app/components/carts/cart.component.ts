import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ValueSansProvider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgZone} from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  cartItems: any[] = [];
  totalPrice: number = 0;
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef, private ngZone: NgZone, private router: Router) {}

  ngOnInit(): void {
    this.getCartItems();

    this.cartService.cartUpdated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        console.log('Cart Updated in Component:', items);
        this.cartItems = items;
        this.updateCartView();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCartItems(): void {
    this.cartItems = this.cartService.getCartItems() || [];
    console.log('Initial Cart Items:', this.cartItems); // 输出初始购物车内容
    this.updateCartView();
    
  }

  increaseQuantity(item: any): void {
    console.log('Increasing quantity button clicked for:', item);

    const index = this.cartItems.findIndex(cartItem => cartItem.productId._id === item.productId._id);
    if (index > -1) {
      const updatedItem = {
        ...this.cartItems[index],
        quantity: this.cartItems[index].quantity + 1,
        productId: { ...this.cartItems[index].productId } // 保留所有属性，包括 price
      };
      console.log('Updated Item after Increase:', updatedItem); // 输出更新后的项目
      this.cartItems[index] = updatedItem;

      this.cartService.updateCart(updatedItem);
      this.updateCartView();
    }
  }

  decreaseQuantity(item: any): void {
    console.log('Decreasing quantity button clicked for:', item);

    const index = this.cartItems.findIndex(cartItem => cartItem.productId._id === item.productId._id);
    if (index > -1 && this.cartItems[index].quantity > 1) {
      const updatedItem = {
        ...this.cartItems[index],
        quantity: this.cartItems[index].quantity - 1,
        productId: { ...this.cartItems[index].productId } // 保留所有属性，包括 price
      };
      console.log('Updated Item after Decrease:', updatedItem); // 输出更新后的项目
      this.cartItems[index] = updatedItem;

      this.cartService.updateCart(updatedItem);
      this.updateCartView();
    }
  }

  removeItem(itemId: string): void {
    console.log('Removing item:', itemId);

    this.cartItems = this.cartItems.filter(item => item.productId._id !== itemId);
    this.cartService.removeItem(itemId);
    this.updateCartView();
  }

  updateCartView(): void {
    this.calculateTotalPrice();
    this.ngZone.run(() => {
      this.cdr.detectChanges(); // 强制触发变更检测
    });
  }

  calculateTotalPrice(): void {
    console.log('Cart Items before Calculating Total Price:', this.cartItems); // 输出购物车内容用于检查
    this.totalPrice = this.cartItems.reduce((total, item) => {
      // 确保每个项目都有正确的价格
      const price = item.productId?.price ?? 0;
      console.log(`Calculating price for item ${item.productId?._id}: price=${price}, quantity=${item.quantity}`);
      return total + (price * item.quantity);
    }, 0);
    console.log('Calculating total price:', this.totalPrice);
  }

  checkout(): void {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/checkout']); // 跳转到 checkout 页面
    } else {
      alert('Your cart is empty. Please add some items before checking out.');
    }
  }
  

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}
