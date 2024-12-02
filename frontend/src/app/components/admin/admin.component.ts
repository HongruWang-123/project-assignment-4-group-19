import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';
import { AdminPageComponent } from '../admin-page/admin-page.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavComponent,AdminPageComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
