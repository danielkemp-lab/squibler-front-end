import { Routes } from '@angular/router';
import {AuthGuard} from "../_guards";
import {SettingsComponent} from "./component/settings/settings.component";
import {DashboardComponent} from "./component/dashboard.component";
import {ProjectsComponent} from "./component/projects/projects.component";
import {BoardsComponent} from "./component/boards/boards.component";
import {EditorComponent} from "./component/editor/editor.component";

export const DashboardRoutes: Routes = [
    {path: '', redirectTo: '/dashboard/projects', pathMatch: "full"},
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'projects',
                component: ProjectsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                component: SettingsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'boards/:boardId',
                component: BoardsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'projects/:projectId',
                component: EditorComponent,
                canActivate: [AuthGuard]
            },
        ],
    },
];
