import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {HomepageComponent} from "./component/homepage/homepage.component";
import {HomePageRoutes} from "./homepage.routes";
import {BoardingFooterComponent} from "./component/footer-boarding/boarding.footer.component";
import {BoardingHeaderComponent} from "./component/header-boarding/boarding.header.component";
@NgModule({
    imports: [
      CommonModule, RouterModule, RouterModule.forChild(HomePageRoutes), FormsModule, ReactiveFormsModule
    ],
    declarations: [
      HomepageComponent, BoardingFooterComponent, BoardingHeaderComponent
    ]
})
export class HomepageModule {}
