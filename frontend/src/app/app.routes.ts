// app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AdminuserComponent } from './components/adminuser/adminuser.component';
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';
// import { ProductPageComponent } from './components/product-page/product-page.component';
// import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { CartComponent } from './components/carts/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';



export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'callback', component: CallbackComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  { path: 'adminPage', component: AdminComponent, canActivate:[AuthGuard,AdminGuard]},
  { path: 'adminuser', component: AdminuserComponent, canActivate:[AuthGuard,AdminGuard]},
  // {path: 'products', component: ProductPageComponent},
  // {path: 'admin', component: AdminPageComponent},
  
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },



  { path: '**', redirectTo: '' },
];
