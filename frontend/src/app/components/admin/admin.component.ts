import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    this.http.get('http://localhost:5000/api/auth/user', { withCredentials: true }).subscribe(
      (user: any) => {
        this.authService.login(user);
        console.log(localStorage.getItem('user'));
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

}
