import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  computerForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder,private productService: ProductService) {
    this.computerForm = this.fb.group({
      model: ['', Validators.required],
      category: ['', Validators.required],
      specification: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      Image: ['', Validators.required],
      review: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      rate: [null, [Validators.min(0), Validators.max(5)]],
    });
  }

  addComputer() {
    if (this.computerForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    const payload = this.computerForm.value;

    console.log(payload)

    this.http.post('http://localhost:5000/api/admin', payload).subscribe({
      next: (response) => {
        alert('Computer added successfully.');
        console.log(response);
        this.productService.notifyProductUpdated(); // Notify update
        this.computerForm.reset();
      },
      error: (error) => {
        alert('Failed to add the computer.');
        console.error(error);
      }
    });
  }

updateComputer() {

  const model = this.computerForm.get('model')?.value; // Extract the model from the form
  if (!model) {
    alert('Please provide the model name to update.');
    return;
  }

  const payload = this.computerForm.value;

  // Include the model in the URL
  this.http.patch(`http://localhost:5000/api/admin/${model}`, payload).subscribe({
    next: (response) => {
      alert('Computer updated successfully.');
      console.log(response);
      this.productService.notifyProductUpdated(); // Notify update
      this.computerForm.reset();
    },
    error: (error) => {
      alert('Failed to update the computer.');
      console.error(error);
    }
  });
}

  deleteComputer() {
    const model = this.computerForm.get('model')?.value;
    console.log(model)

    if (!model) {
      alert('Please provide the model name to delete.');
      return;
    }

    this.http.delete(`http://localhost:5000/api/admin/${model}`).subscribe({
      next: (response) => {
        alert('Computer deleted successfully.');
        console.log(response);
         this.productService.notifyProductUpdated(); // Notify update
         this.computerForm.reset();
      },
      error: (error) => {
        alert('Failed to delete the computer.');
        console.error(error);
      }
    });
  }
}