import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgWidth',
})
export class ImgWidthPipe implements PipeTransform {
  public transform(url: string | undefined | null, size = 150): string {
    if (!url) return '';

    return url.replace('width=300', `width=${size}`);
  }
}
