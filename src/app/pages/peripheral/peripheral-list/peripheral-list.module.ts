import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeripheralListComponent } from './peripheral-list.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        PeripheralListComponent
    ],
    exports: [
        PeripheralListComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgbPaginationModule,
        RouterModule.forChild([{path: '', component: PeripheralListComponent}]),
        FormsModule
    ]
})
export class PeripheralListModule { }
