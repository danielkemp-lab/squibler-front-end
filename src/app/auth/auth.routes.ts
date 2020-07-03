import { Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {ResetpwdComponent} from "./component/resetpwd/resetpwd.component";

export const AuthRoutes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: "full"},
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ResetpwdComponent },
    { path: 'restore-password', component: ResetpwdComponent },
];
