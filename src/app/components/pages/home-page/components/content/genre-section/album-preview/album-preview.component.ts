import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Album } from '../../music-collection.mock';

@Component({
  selector: 'app-album-preview',
  imports: [],
  templateUrl: './album-preview.component.html',
  styleUrl: './album-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumPreviewComponent {
  readonly album = input.required<Album>();
}
