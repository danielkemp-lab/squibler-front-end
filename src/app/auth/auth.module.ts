import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthRoutes} from "./auth.routes";
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {LoginComponent} from "./component/login/login.component";
import {ResetpwdComponent} from "./component/resetpwd/resetpwd.component";
import {RegisterComponent} from "./component/register/register.component";
import { CommonModule } from "@angular/common";
@NgModule({
    imports: [
      CommonModule, RouterModule, RouterModule.forChild(AuthRoutes), FormsModule, ReactiveFormsModule
    ],
    declarations: [
      LoginComponent,
      ResetpwdComponent,
      RegisterComponent,
    ]
})
export class AuthModule {}
