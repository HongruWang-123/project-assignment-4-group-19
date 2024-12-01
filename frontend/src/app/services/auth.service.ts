import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';


interface User {
  googleId: string;
  familyName: string;
  givenName: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private user: any = null;
  private role: any;
  private email: any;
  
  constructor(private router: Router,private http: HttpClient) {}

  login(): void {

    this.http.get('http://localhost:5000/api/auth/user', { withCredentials: true }).subscribe(response => {
      localStorage.setItem('user', JSON.stringify(response));
    });
  }

  getUser1(): any {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
      console.log('Loaded user from localStorage:', this.user);
    }
    return this.user;
  }

  getUser(): Observable<any> {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
      console.log('Loaded user from localStorage:', this.user);
    }
    return of(this.user);
  }

  getRole(): string {
    const userDataString =localStorage.getItem('user');
    if (userDataString) {
        const parsedData = JSON.parse(userDataString);
        this.role = parsedData.user.role;
        return this.role;
    }
    else{
      return '';
    }
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/userlist`,{ withCredentials: true });
  }

  updateUserRole(googleId: string, role: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateRole/${googleId}`, { role },{ withCredentials: true });
  }
  deleteUser(googleId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteUser/${googleId}`,{ withCredentials: true });
  }


  getEmail(): string {
    const userDataString =localStorage.getItem('user');
    if (userDataString) {
        const parsedData = JSON.parse(userDataString);
        this.email = parsedData.user.email;
        return this.email;
    }
    else{
      return '';
    }
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
