import { Routes } from '@angular/router';
import { SigninComponent } from './login/signin/signin.component';
import { SignupComponent } from './login/signup/signup.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';

export const routes: Routes = [

    {
        path:'',redirectTo:'signin',pathMatch:'full'
    },
    {
        path:'signin', component:SigninComponent, pathMatch:'full'
    },
    {
        path:'signup',component:SignupComponent
    },
    {
        path:'dashboard',component:DashboardComponent
    },
    {
        path:'resetpass',component:ResetPasswordComponent
    }
];
