import {Pipe, PipeTransform} from '@angular/core';
import * as moment from "moment";

@Pipe({
    name: 'fromDateInMillis'
})
export class FromDateInMillisPipe implements PipeTransform {

    transform(value: number): string {
        const m = moment(value, 'x');
      return m.format('MMM DD, YYYY') + ' at ' + m.format('h:mm a');
    }

}
