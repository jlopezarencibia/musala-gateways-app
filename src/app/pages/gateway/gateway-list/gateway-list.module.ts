import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewayListComponent } from './gateway-list.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        GatewayListComponent
    ],
    exports: [
        GatewayListComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgbPaginationModule,
        RouterModule.forChild([{path: '', component: GatewayListComponent}]),
        FormsModule
    ]
})
export class GatewayListModule { }
