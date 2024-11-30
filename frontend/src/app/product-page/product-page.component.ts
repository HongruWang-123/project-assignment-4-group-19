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
  filteredProducts: any[] = [];
  uniqueCategories: string[] = ['Desktop', 'Laptop', 'Accessories', 'Monitor']; // Predefined categories
  searchQuery = '';
  selectedCategory = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.uniqueCategories = ['Desktop', 'Laptop', 'Accessories', 'Monitor'];
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

   onSearch(query: string) {
    this.searchQuery = query.toLowerCase();
    this.applyFilters();
  }

  onFilterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory
        ? product.category === this.selectedCategory
        : true;
      const matchesSearch = this.searchQuery
        ? product.model.toLowerCase().includes(this.searchQuery)
        : true;
      return matchesCategory && matchesSearch;
    });
  }
  
}