import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {DashboardRoutes} from "./dashboard.routes";
import {DashboardComponent} from "./component/dashboard.component";
import {SubSectionsComponent} from "./component/subsections/subsections.component";
import {ProjectsComponent} from "./component/projects/projects.component";
import {NavigationComponent} from "./component/navigation/navigation.component";
import {IdeasComponent} from "./component/ideas/ideas.component";
import {EditorComponent} from "./component/editor/editor.component";
import {NotesComponent} from "./component/editor/components/notes/notes.component";
import {SidebarComponent} from "./component/editor/components/sidebar/sidebar.component";
import {SummaryComponent} from "./component/editor/components/summary/summary.component";
import {ProjectTreeSectionComponent} from "./component/editor/components/sidebar/components/project-tree/components/project-tree-section/project-tree-section.component";
import {ProjectTreeComponent} from "./component/editor/components/sidebar/components/project-tree/project-tree.component";
import {BoardsComponent} from "./component/boards/boards.component";
import {SidebarToggleComponent} from "./component/editor/components/sidebar/components/sidebar-toggle/sidebar-toggle.component";
import {BoardItemComponent} from "./component/editor/components/sidebar/components/sidebar-toggle/components/board-item/board-item.component";
import {SettingsComponent} from "./component/settings/settings.component";
import {AppCommonModule} from "../common/app.comon.module";
import {ProjectBoxesComponent} from "./component/projectBoxes/projectBoxes.component";
import {FilterPipe} from "./pipes/filter.pipe";
import {SafeHtmlPipe} from "./pipes/safehtml.pipe";
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {TabModule} from 'angular-tabs-component';
import {DragDropModule} from '@angular/cdk/drag-drop';

const COMPONENTS = [
    DashboardComponent, SubSectionsComponent, ProjectsComponent,
    NavigationComponent, IdeasComponent, EditorComponent, NotesComponent,
    SidebarComponent, SummaryComponent, ProjectTreeSectionComponent, ProjectTreeComponent,
    BoardsComponent, BoardItemComponent, SidebarToggleComponent, SettingsComponent,
    ProjectBoxesComponent,
];

const PIPES = [
    FilterPipe, SafeHtmlPipe
];

const MODULES = [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    TabModule
];

@NgModule({
    imports: [
      AppCommonModule,
      CommonModule,
      RouterModule,
      DragDropModule,
      RouterModule.forChild(DashboardRoutes),
      FormsModule,
      ReactiveFormsModule,
      MODULES
    ],
    declarations: [
        COMPONENTS, PIPES
    ]
})

export class DashboardModule {}
