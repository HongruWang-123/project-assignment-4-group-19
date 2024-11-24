import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Backend API endpoint

  constructor(private http: HttpClient) {}

  // Fetch user data from backend
  getUserData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, { withCredentials: true });
  }
}
