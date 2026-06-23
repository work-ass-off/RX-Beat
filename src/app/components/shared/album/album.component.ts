import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Album } from '../../../models';
import { ReleaseDatePipe } from '../../../pipes/release-date/release-date.pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-album',
  imports: [ReleaseDatePipe, NgOptimizedImage],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
  host: {
    class: 'album',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumComponent {
  public album = input.required<Album>();
}
