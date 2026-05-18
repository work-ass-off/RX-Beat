import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AlbumPreviewComponent } from './album-preview/album-preview.component';
import { GenreCollection } from '../music-collection.mock';

@Component({
  selector: 'app-genre-section',
  standalone: true,
  imports: [AlbumPreviewComponent],
  templateUrl: './genre-section.component.html',
  styleUrl: './genre-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenreSectionComponent {
  readonly genre = input.required<GenreCollection>();
}
