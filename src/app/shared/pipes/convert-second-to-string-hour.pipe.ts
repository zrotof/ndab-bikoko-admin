import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertSecondToStringHour',
    standalone: false
})
export class ConvertSecondToStringHourPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
