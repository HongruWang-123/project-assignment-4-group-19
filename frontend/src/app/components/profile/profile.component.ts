import { Component,OnInit  } from '@angular/core';
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

  constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient) {
    this.profileForm = this.fb.group({
      givenName: [''],
      familyName: [''],
      email: [''],
      address: [''],
      paymentMethod: [''],
      // name: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.data = this.authService.getUser();
    console.log(this.data);

    this.profileForm.patchValue({
      givenName: this.data.user.givenName,
      familyName: this.data.user.familyName,
      email: this.data.user.email,
      address: this.data.user.address,
      paymentMethod: this.data.user.paymentMethod
    });
    
  }
  onSave(): void {
    if (this.profileForm.valid) {
      this.http.put('http://localhost:5000/api/auth/user', this.profileForm.value,{withCredentials: true}).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }
}
