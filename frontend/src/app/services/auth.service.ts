import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any = null;
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());


  constructor(private router: Router) {}

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  login(user: any): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    console.log('User logged in:', this.user);
  }
  // login(user: any): void {
  //   this.user = user;
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.authStatus.next(true); // Emit logged-in status
  // }


  getUser(): Observable<any> {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
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
    const userString = localStorage.getItem('user'); // Get the JSON string from localStorage
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
    this.router.navigate(['/']);
  }
  // logout(): void {
  //   this.user = null;
  //   localStorage.removeItem('user');
  //   this.authStatus.next(false); // Emit logged-out status
  //   this.router.navigate(['/']);
  // }
}
