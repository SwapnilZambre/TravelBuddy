import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'; // ✅ import this
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NotificationService } from './Services/notification.service';
import { HasRoleAccessDirective } from './Directives/has-role-access.directive';
import { UserService } from './Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapService } from './Services/google-map.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(MatIconModule,HttpClientModule,MatSnackBarModule), 
    NotificationService,
    HasRoleAccessDirective,
    UserService,
    GoogleMapService
  ]
};
