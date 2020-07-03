import { Routes } from '@angular/router';
import {HomepageComponent} from "./component/homepage/homepage.component";

export const HomePageRoutes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'index', redirectTo: '', pathMatch: 'full'}
];
