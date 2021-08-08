import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleBarComponent } from './title-bar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [
        TitleBarComponent
    ],
    exports: [
        TitleBarComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule
    ]
})
export class TitleBarModule { }
