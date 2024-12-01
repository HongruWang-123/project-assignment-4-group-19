import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: { name: string; quantity: number; price: number }[] = []; // Shopping cart items
  totalPrice: number = 0; // Total price of the cart
  email: string = 'z2827971726@gmail.com'; // Default email for testing

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartData(); // Load shopping cart data
    // Simulate getting the email from auth service
    console.log(`Using test email: ${this.email}`);
  }

  // Load shopping cart data from the service
  loadCartData(): void {
    const userId = 'USER_ID'; // Replace with dynamically fetched user ID
    this.cartService.getCart(userId).subscribe(
      (data) => {
        this.cartItems = data.items.map((item: any) => ({
          name: item.productId.name, // Item name
          quantity: item.quantity,  // Item quantity
          price: item.productId.price, // Item price
        }));
        this.calculateTotal(); // Calculate the total price
      },
      (error) => {
        console.error('Error fetching cart data:', error);
      }
    );
  }

  // Calculate the total price of the cart
  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }

  // Confirm the order and send an email
  confirmOrder(): void {
    if (!this.email) {
      alert('User email is not available!');
      return;
    }

    // Simulate sending an email (mocked service call)
    this.sendEmail(this.email, this.cartItems, this.totalPrice);

    alert(`Order confirmed! A confirmation email has been sent to ${this.email}.`);
    // Clear the cart
    this.cartItems = [];
    this.totalPrice = 0;
  }

  // Simulate sending an email (this could be replaced by an actual backend API call)
  sendEmail(email: string, items: { name: string; quantity: number; price: number }[], total: number): void {
    console.log(`Sending email to: ${email}`);
    console.log('Order details:');
    console.log(items);
    console.log(`Total price: ${total}`);
    // Actual email-sending logic goes here (API call to backend service)
  }
}
