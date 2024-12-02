import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavComponent } from '../nav/nav.component';
import { HttpClient } from '@angular/common/http';
import { ProductPageComponent } from '../product-page/product-page.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent,ProductPageComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    this.authService.login();
  }
}
