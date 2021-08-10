import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FromDateInMillisPipe } from './from-date-in-millis.pipe';



@NgModule({
    declarations: [
        FromDateInMillisPipe
    ],
    exports: [
        FromDateInMillisPipe
    ],
    imports: [
        CommonModule
    ]
})
export class FromDateInMillisModule { }
