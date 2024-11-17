
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5000/cart';

  constructor(private http: HttpClient) {}

  addToCart(userId: string, productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { userId, productId, quantity });
  }

  removeFromCart(userId: string, productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/remove`, { userId, productId });
  }

  getCart(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
