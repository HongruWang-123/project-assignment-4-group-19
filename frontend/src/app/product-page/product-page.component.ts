import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  products: any[] = [];
  // cart: any[] = [];
  // cartTotal: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Fetch product information from the backend
  fetchProducts(): void {
    this.http.get('http://localhost:5000/api/products').subscribe(
      (response: any) => {
      // Extract the 'data' property from the response object
      this.products = response;
      console.log(this.products)
    },
    (error) => {
      console.error('Error fetching products:', error);
    }
    );
  }

  
}