import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder, ReactiveFormsModule, Validators  } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavComponent } from '../nav/nav.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NavComponent ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any;
  profileForm: FormGroup;
  isAdmin: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient) {
    this.profileForm = this.fb.group({
      givenName: ['', Validators.required],
      familyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required], 
    });
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.data = this.authService.getUser1();
    console.log(this.data);

    this.profileForm.patchValue({
      givenName: this.data.user.givenName,
      familyName: this.data.user.familyName,
      email: this.data.user.email,
      address: this.data.user.address,
      paymentMethod: this.data.user.paymentMethod,
    });

    this.profileForm.valueChanges.subscribe((values) => {
      const user = {
        user: {
          givenName: values.givenName,
          familyName: values.familyName,
          email: values.email,
          address: values.address,
          paymentMethod: values.paymentMethod
        },
      };
      localStorage.setItem('user', JSON.stringify(user)); // Save to localStorage
    });
  }
  onSave(): void {
    if (this.profileForm.valid) {
      this.http.put('http://localhost:5000/api/auth/user', this.profileForm.value,{withCredentials: true}).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          alert('Profile saved successfully!');
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
    else{
      alert('Please fill in all required fields with correct format.');
      this.profileForm.markAllAsTouched(); 
    }
  }

  deleteUser():void{
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete){
      this.http.delete(`http://localhost:5000/api/auth/delete`).subscribe({
        next: (response) => {
          console.log('User deleted successfully:', response);
          // log out and redirect to login page
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        },
      });
    }
  }
}
