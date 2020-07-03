import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CustomTitlePopupComponent} from "./component/custom-title-popup/custom-title-popup.component";

const MODULES = [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule
];

const COMPONENTS = [
    CustomTitlePopupComponent,
];

@NgModule({
    imports: [
        MODULES
    ],
    declarations: [
        COMPONENTS,
    ],
    exports: [
        MODULES, COMPONENTS,
    ]
})
export class AppCommonModule {}
