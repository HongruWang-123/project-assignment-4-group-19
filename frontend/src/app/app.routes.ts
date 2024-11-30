// app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'callback', component: CallbackComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  { path: 'adminPage', component: AdminComponent, canActivate:[AuthGuard,AdminGuard]},
  { path: '**', redirectTo: '' },
];
