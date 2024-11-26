import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavComponent } from '../nav/nav.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

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
