import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = '/api/cart';

  constructor(private http: HttpClient) {}

  getCart(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  addToCart(data: { userId: string; productId: string; quantity: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  removeFromCart(data: { userId: string; productId: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/remove`, data);
  }
}