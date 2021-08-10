import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeripheralDetailsComponent } from './peripheral-details.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {FromDateInMillisModule} from "../../../pipes/from-date-in-millis/from-date-in-millis.module";



@NgModule({
  declarations: [
    PeripheralDetailsComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: PeripheralDetailsComponent}]),
        FontAwesomeModule,
        NgbAlertModule,
        FromDateInMillisModule
    ]
})
export class PeripheralDetailsModule { }
