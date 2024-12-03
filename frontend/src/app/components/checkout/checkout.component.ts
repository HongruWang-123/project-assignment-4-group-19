import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: { name: string; quantity: number; price: number }[] = []; // Shopping cart items
  totalPrice: number = 0; // Total price of the cart
  email: string = '';

  street: string = '';
  city: string = '';
  province: string = '';
  country: string = '';
  postcode: string = '';

  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  nameOnCard: string = '';

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCartData(); // Load shopping cart data
  }

  // Load shopping cart data from the service
  loadCartData(): void {
    const data = this.cartService.getCartItems();
    this.cartItems = data.map((item: any) => ({
      name: item.productId.model,
      quantity: item.quantity,  // Item quantity
      price: item.productId.price, // Item price
    }));
    this.calculateTotal(); // Calculate the total price
  }

  // Calculate the total price of the cart
  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    console.log('Total price calculated:', this.totalPrice);
  }

  confirmOrder(): void {
    if (!this.street || !this.city || !this.province || !this.country || !this.postcode || !this.cardNumber || !this.expiryDate || !this.cvv || !this.nameOnCard) {
      alert('Please fill in all the required fields to proceed with the order.');
      return;
    }

    this.sendEmail(this.cartItems, this.totalPrice);

    alert(`Order confirmed! A confirmation email has been sent.`);
    this.cartItems = [];
    this.totalPrice = 0;
  }

  // Send email via backend
  sendEmail(items: { name: string; quantity: number; price: number }[], total: number): void {
    const payload = {
      email: 'z2827971726@gmail.com',
      items,
      total,
      address: {
        street: this.street,
        city: this.city,
        province: this.province,
        country: this.country,
        postcode: this.postcode,
      },
      payment: {
        cardNumber: this.cardNumber,
        expiryDate: this.expiryDate,
        cvv: this.cvv,
        nameOnCard: this.nameOnCard,
      }
    };
    this.http.post('http://localhost:3000/send-email', payload).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
        alert('Order confirmed! A confirmation email has been sent.');
      },
      (error) => {
        console.error('Error sending email:', error);
        alert('There was an error sending the email. Please try again later.');
      }
    );
  }


}
