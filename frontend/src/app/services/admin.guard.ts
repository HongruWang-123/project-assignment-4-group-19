// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminGuard implements CanActivate {

//   // constructor(private authService: AuthService, private router: Router) {}
//   constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

//   canActivate(): boolean {
//     // this.http.get('http://localhost:5000/api/auth/user', { withCredentials: true }).subscribe(
//     //   (user: any) => {
//     //     this.authService.login(user);
//     //     console.log(localStorage.getItem('user'));
//     //   },
//     //   (error) => {
//     //     console.error('Error fetching user data:', error);
//     //   }
//     // );
//     if (this.authService.isAdmin()) {
//         return true;
//     }
//     else{//not authorized
//         console.log("to dashboard");
//         this.router.navigate(['/dashboard']);
//         return false;
//     }
//   }
// }


