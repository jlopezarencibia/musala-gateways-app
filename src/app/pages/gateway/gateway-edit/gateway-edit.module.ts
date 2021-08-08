import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewayEditComponent } from './gateway-edit.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    GatewayEditComponent
  ],
  imports: [
    CommonModule,
      RouterModule.forChild([{path: '', component: GatewayEditComponent}])
  ]
})
export class GatewayEditModule { }
