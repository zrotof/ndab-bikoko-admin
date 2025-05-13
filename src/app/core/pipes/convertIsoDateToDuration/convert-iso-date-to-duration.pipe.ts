import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertIsoDateToDuration',
  standalone: true
})
export class ConvertIsoDateToDurationPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return '';

    const now = new Date().getTime();
    const diffInMilliseconds = now - new Date(value).getTime();

    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Format de la durée selon les valeurs calculées
    if (days > 0) {
      return `${days} jour(s)`;
    } else if (hours > 0) {
      return `${hours} heure(s)`;
    } else if (minutes > 0) {
      return `${minutes} min`;
    } else {
      return `${seconds} secondes`;
    }
  }
}
