import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeripheralEditComponent } from './peripheral-edit.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    PeripheralEditComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: PeripheralEditComponent}]),
        FormsModule,
        NgbAlertModule,
        FontAwesomeModule
    ]
})
export class PeripheralEditModule { }
