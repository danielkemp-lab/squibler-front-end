import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './_guards';
import {AppComponent} from "./app.component";

const appRoutes: Routes = [

    {
        component: AppComponent,
        path: 'auth',
        loadChildren: "./auth/auth.module#AuthModule"
    },
    {
        component: AppComponent,
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: "./dashboard/dashboard.module#DashboardModule"
    },
    {
        component: AppComponent,
        path: '',
        loadChildren: "./homepage/homepage.module#HomepageModule"
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export const routing = RouterModule.forRoot(appRoutes);
