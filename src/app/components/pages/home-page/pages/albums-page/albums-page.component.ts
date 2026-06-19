import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';
import { JamendoAlbumsService } from '../../../../../services/jamendo/jamendo-albums/jamendo-albums.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-albums-page',
  imports: [ContentComponent],
  templateUrl: './albums-page.component.html',
  styleUrl: './albums-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsPageComponent {
  private jamendoAlbumsService = inject(JamendoAlbumsService);

  private albumsSignal = toSignal(this.jamendoAlbumsService.getAlbums(), { initialValue: [] });
}
