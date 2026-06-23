import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'trackTime',
})
export class TrackTimePipe implements PipeTransform {
  public transform(value: number | null, maxLength = 2): string {
    const seconds = value ?? 0;
    const mm = Math.floor(seconds / 60)
      .toString()
      .padStart(maxLength, '0');
    const ss = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${mm}:${ss}`;
  }
}
