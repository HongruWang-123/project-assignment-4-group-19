import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router,private http: HttpClient) {}

  ngOnInit(): void {
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }

  
}
