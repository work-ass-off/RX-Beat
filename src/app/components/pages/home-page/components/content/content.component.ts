import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MUSIC_COLLECTION_MOCK } from './music-collection.mock';
import { GenreSectionComponent } from './genre-section/genre-section.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [GenreSectionComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  readonly musicCollectionMock = input(MUSIC_COLLECTION_MOCK);

  get genres() {
    return Object.values(this.musicCollectionMock());
  }
}
