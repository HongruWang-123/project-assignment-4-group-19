import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthService } from './app/services/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(),
    provideHttpClient(),
    provideRouter(routes),
    // AuthService,
    // {
    //   provide: 'APP_INITIALIZER',
    //   useFactory: (authService: AuthService) => () => authService.fetchUser().toPromise(),
    //   deps: [AuthService],
    //   multi: true
    // }
  ],
}).catch(err => console.error(err));
