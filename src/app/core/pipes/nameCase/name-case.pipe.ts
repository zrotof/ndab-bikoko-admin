import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameCase',
  standalone: true
})

export class NameCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.toLowerCase().replace(/(?:^|[\s\-'])\w/g, match => match.toUpperCase());
  }
}
