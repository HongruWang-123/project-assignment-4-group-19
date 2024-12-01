import { Component,OnInit,NgModule  } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-adminuser',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './adminuser.component.html',
  styleUrl: './adminuser.component.css'
})

export class AdminuserComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserList().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }
}