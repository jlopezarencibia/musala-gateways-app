import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewayEditComponent } from './gateway-edit.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    GatewayEditComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: GatewayEditComponent}]),
        FontAwesomeModule,
        FormsModule,
        NgbAlertModule
    ]
})
export class GatewayEditModule { }
