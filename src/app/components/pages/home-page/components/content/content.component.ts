import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type GenreCollection, MUSIC_COLLECTION_MOCK, type MusicCollectionByGenre } from './music-collection.mock';
import { GenreSectionComponent } from './genre-section/genre-section.component';

@Component({
  selector: 'app-content',
  imports: [GenreSectionComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  protected readonly musicCollectionMock = input<MusicCollectionByGenre>(MUSIC_COLLECTION_MOCK);

  public get genres(): GenreCollection[] {
    return Object.values(this.musicCollectionMock());
  }
}
