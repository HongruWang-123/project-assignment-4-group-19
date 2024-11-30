import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

export const routes: Routes = [
    // path: 'admin', Component: AdminDashboardComponent
    {path: 'products', component: ProductPageComponent},
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    {path: 'admin', component: AdminPageComponent},

];
