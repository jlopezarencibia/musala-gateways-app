import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeripheralEditComponent } from './peripheral-edit.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    PeripheralEditComponent
  ],
  imports: [
    CommonModule,
      RouterModule.forChild([{path: '', component:PeripheralEditComponent}])
  ]
})
export class PeripheralEditModule { }
