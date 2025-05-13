import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTimestampToStringDate',
  standalone: true
})
export class ConvertTimestampToStringDatePipe implements PipeTransform {

  transform(value: number , form : string = 'short'): unknown {
    if (!value) {
      return '';
    }

    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value);

    return formattedDate || '';
  }

}
