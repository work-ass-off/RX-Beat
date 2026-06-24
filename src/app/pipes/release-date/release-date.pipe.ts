import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'releaseDate',
})
export class ReleaseDatePipe implements PipeTransform {
  public transform(value: string | Date, part: 'year' | 'month' | 'day' | 'full' = 'full'): string {
    if (!value) return '';

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    switch (part) {
      case 'year':
        return year;
      case 'month':
        return month;
      case 'day':
        return day;
      case 'full':
      default:
        return `${day}/${month}/${year}`;
    }
  }
}
