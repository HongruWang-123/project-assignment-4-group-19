import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      givenName: [''],
      familyName: [''],
      email: ['']
    });
  }

  ngOnInit(): void {

    this.authService.getUserData().subscribe((response)=>{
      console.log(response);
      this.data = response;
      this.profileForm.patchValue({
        givenName: this.data.user.givenName,
        familyName: this.data.user.familyName,
        email: this.data.user.email
      });
    });
  }
}