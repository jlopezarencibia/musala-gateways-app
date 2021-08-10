import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewayDetailsComponent } from './gateway-details.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    GatewayDetailsComponent
  ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule.forChild([{path: '', component: GatewayDetailsComponent}]),
        FormsModule,
        NgbAlertModule
    ]
})
export class GatewayDetailsModule { }
