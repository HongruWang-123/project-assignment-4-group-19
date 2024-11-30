import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductPageComponent, AdminPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
