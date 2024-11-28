import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any = null;
  // private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());


  constructor(private router: Router,private http: HttpClient) {}

  // getAuthStatus(): Observable<boolean> {
  //   return this.authStatus.asObservable();
  // }

  // getUserProfile() {
  //   return this.http.get('http://localhost:5000/api/auth/user');
  // }

  // login(user: any): void {
  //   this.http.get('')
  //   localStorage.setItem('user', JSON.stringify(user));
  //   console.log('User logged in:', this.user);
  // }http://localhost:5000/api/auth/user
  login(user: any): void {
    this.http.post('http://localhost:5000/api/auth/login', user, { withCredentials: true }).subscribe({
      next: (response: any) => {
        localStorage.setItem('user', JSON.stringify(response));
        console.log(localStorage);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }


  // getUser(): Observable<any> {
  //     return this.http.get('http://localhost:5000/api/auth/user', { withCredentials: true });
  // }

  getUser(): Observable<any> {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
      console.log(this.user);
    }
    return this.user;
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    return !!storedUser;
  }

  // Check if the user is an admin
  isAdmin(): boolean {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString); // Parse the JSON string into an object
      if(user.role==='admin'){
        return true;
      }
      else{
        return false;
      }
    } 
    else {
      console.log('No user found in localStorage');
    }
    return false;
  }
  

  // Logout
  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
    console.log("Clear the localstorage");
    console.log(localStorage);
    this.http.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true }).subscribe({
      next: (response) => {
        console.log('Logged out from backend:', response);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
      }
    });
  }
}
