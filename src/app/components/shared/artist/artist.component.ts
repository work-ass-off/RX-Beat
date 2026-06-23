import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Artist } from '../../../models';

@Component({
  selector: 'app-artist',
  imports: [],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
  host: {
    class: 'artist',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistComponent {
  public artist = input.required<Artist>();
}
