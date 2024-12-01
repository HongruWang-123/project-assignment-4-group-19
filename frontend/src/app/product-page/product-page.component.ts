import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  products: any[] = [];
  productSubscription: Subscription | undefined;
  filteredProducts: any[] = [];
  uniqueCategories: string[] = ['Desktop', 'Laptop', 'Accessories', 'Monitor'];
  searchQuery = '';
  selectedCategory = '';
  cart: any[] = []; // Shopping cart data

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private router: Router // Inject router for navigation
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.uniqueCategories = ['Desktop', 'Laptop', 'Accessories', 'Monitor'];

    // Subscribe to product updates
    this.productSubscription = this.productService.productUpdated$.subscribe(() => {
      console.log('Product update detected in ProductPageComponent');
      this.fetchProducts(); // Refresh product list
    });

    // Add event listener for Shopping Cart button
    const cartButton = document.querySelector('.shopping-cart');
    if (cartButton) {
      cartButton.addEventListener('click', () => this.goToCart());
    }
  }

  // Fetch product information from the backend
  fetchProducts(): void {
    this.http.get('http://localhost:5000/api/products').subscribe(
      (response: any) => {
        // Extract the 'data' property from the response object
        this.products = response;
        this.filteredProducts = [...this.products];
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Handle search query
  onSearch(query: string): void {
    this.searchQuery = query.toLowerCase();
    this.applyFilters();
  }

  // Handle category filtering
  onFilterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  // Apply search and category filters
  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = this.selectedCategory
        ? product.category === this.selectedCategory
        : true;
      const matchesSearch = this.searchQuery
        ? product.model.toLowerCase().includes(this.searchQuery)
        : true;
      return matchesCategory && matchesSearch;
    });
  }

  // Add a product to the shopping cart
  addToCart(product: any): void {
    const existingItem = this.cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    console.log('Cart:', this.cart); // Debugging purpose
  }

  // Navigate to the cart page
  goToCart(): void {
    this.router.navigate(['/cart']); // Navigate to the cart page
  }

  // Clean up subscriptions to avoid memory leaks
  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
