import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
// import { AdminDashboardComponent } from './components/admin-dashboard.component';

export const routes: Routes = [
    // path: 'admin', Component: AdminDashboardComponent
    {path: 'products', component: ProductPageComponent},
    { path: '', redirectTo: '/products', pathMatch: 'full' }
];
