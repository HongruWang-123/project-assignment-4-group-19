// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private userSubject = new BehaviorSubject<any>(null); // Holds the current user
//   public user = this.userSubject.asObservable(); // Observable for user changes

//   private apiUrl = 'http://localhost:5000/api/auth'; // Backend API endpoint

//   constructor(private http: HttpClient) {}

//   // Fetch user data from backend
//   getUserData(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/user`, { withCredentials: true });
//   }

//   // Fetch the current user
//   fetchUser(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/user`, { withCredentials: true }).pipe(
//       tap(user => this.userSubject.next(user))
//     );
//   }

//   // Logout
//   logout(): Observable<any> {
//     return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
//       tap(() => this.userSubject.next(null))
//     );
//   }

//   // Get current user snapshot
//   get currentUser(): any {
//     return this.userSubject.value; // Access the latest value of the user
//   }

//   // Check if the user is authenticated
//   isAuthenticated(): boolean {
//     return !!this.userSubject.value; // Returns true if user exists, false otherwise
//   }
// }

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any = null;

  constructor(private router: Router) {}

  login(user: any): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    console.log('User logged in:', this.user);
  }


  getUser(): Observable<any> {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }
    return this.user;
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.user;
  }

  // Check if the user is an admin
  isAdmin(): boolean {
    const user = this.user; // Use the latest user snapshot
    return user && user.role === 'admin'; // Check the role
  }
  

  // Logout
  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
