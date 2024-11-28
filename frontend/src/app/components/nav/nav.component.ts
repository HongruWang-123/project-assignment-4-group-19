import { Component,ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})

export class NavComponent {
  constructor(private authService: AuthService, private router: Router) {}

  //View Profile
  navigateToProfile() {
    this.router.navigate(['/profile']); 
  }
  //View Dashboard
  navigateToDashboard() {
    this.router.navigate(['/dashboard']); 
  }
  //View Admin Dashboard
  navigateToAdmin() {
    this.router.navigate(['/adminPage']); 
  }

  //logout
  onLogout() {
    this.authService.logout();
    console.log('Logout requested');
  }
}