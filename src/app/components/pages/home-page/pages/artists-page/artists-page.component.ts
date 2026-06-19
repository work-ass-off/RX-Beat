import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';
import { JamendoArtistsService } from '../../../../../services/jamendo/jamendo-artists/jamendo-artists.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-artists-page',
  imports: [ContentComponent],
  templateUrl: './artists-page.component.html',
  styleUrl: './artists-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistsPageComponent {
  private jamendoArtistsService = inject(JamendoArtistsService);

  private artistsSignal = toSignal(this.jamendoArtistsService.getArtists(), { initialValue: [] });
}
