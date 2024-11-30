import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    user: any;
    role: any;
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        console.log(localStorage) ;
        console.log(localStorage.getItem('user'));
        const userDataString =localStorage.getItem('user');
        if (userDataString) {
            const parsedData = JSON.parse(userDataString);
            this.role = parsedData.user.role;
            console.log(this.role); // John
        }
        console.log(this.role==='admin');

        if (this.role === "admin") {
            console.log("ture, allow admin");
            return true;
        }

        // Redirect to home or another page if not authorized
        this.router.navigate(['/dashboard']);
        return false;
    }
}


