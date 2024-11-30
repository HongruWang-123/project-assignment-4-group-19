
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
        return true;
    } 
    else {
        console.log("HERE");
        this.router.navigate(['/']);
        return false;
    }
  }
}
