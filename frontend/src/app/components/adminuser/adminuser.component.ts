import { Component,OnInit,NgModule  } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { NavComponent } from '../nav/nav.component';
import { AuthService } from '../../services/auth.service';

interface User {
  googleId: string;
  familyName: string;
  givenName: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-adminuser',
  standalone: true,
  imports: [NavComponent,MatTableModule,CommonModule,FormsModule],
  templateUrl: './adminuser.component.html',
  styleUrl: './adminuser.component.css'
})

export class AdminuserComponent implements OnInit {
  users: User[] = [];
  // roles = ['admin', 'user'];

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.getUserList().subscribe(users => {
        this.users = users;
    });
  } 

  updateRole(user: User): void {
    this.authService.updateUserRole(user.googleId, user.role).subscribe(() => {
        alert('Role updated successfully!');
    });
  }

  deleteUser(googleId: string): void {
    this.authService.deleteUser(googleId).subscribe(() => {
        this.users = this.users.filter(user => user.googleId !== googleId);
        alert('User deleted successfully!');
    });
  }
}