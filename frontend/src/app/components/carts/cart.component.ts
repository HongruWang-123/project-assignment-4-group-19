import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // Shopping cart items

  ngOnInit(): void {
    // Example data, replace with data from a service
    this.cartItems = [
      {
        productId: {
          _id: '1',
          image: 'https://via.placeholder.com/100',
          model: 'Product 1',
          price: 50,
          category: 'Category 1',
        },
        quantity: 2,
      },
      {
        productId: {
          _id: '2',
          image: 'https://via.placeholder.com/100',
          model: 'Product 2',
          price: 30,
          category: 'Category 2',
        },
        quantity: 1,
      },
    ];
  }

  // Decrease the quantity of an item
  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(item.productId._id);
    }
  }

  // Increase the quantity of an item
  increaseQuantity(item: any): void {
    item.quantity++;
  }

  // Calculate the total price of items in the cart
  calculateTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  }

  // Remove an item from the cart
  removeItem(productId: string): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.productId._id !== productId
    );
  }

  // Proceed to checkout
  checkout(): void {
    alert('Proceeding to checkout...');
    // Add logic to navigate to the checkout page or process payment
  }
}
