import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CartComponent } from './components/carts/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Default route
  { path: 'products', component: ProductPageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent }
];