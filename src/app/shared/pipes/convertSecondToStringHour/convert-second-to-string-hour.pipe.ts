import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertSecondToStringHour'
})
export class ConvertSecondToStringHourPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {

    const result = new Date(value * 1000).toISOString().slice(11, 16);

    return result;
  }

}
