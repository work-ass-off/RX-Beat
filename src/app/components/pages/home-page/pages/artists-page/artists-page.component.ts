import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JamendoArtistsService } from '../../../../../services/jamendo/jamendo-artists/jamendo-artists.service';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import type { Observable } from 'rxjs';
import type { Artist } from '../../../../../models';
import { AsyncPipe } from '@angular/common';
import { ArtistComponent } from '../../../../shared/artist/artist.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoaderSpinnerComponent } from '../../../../shared/loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-artists-page',
  imports: [ArtistComponent, AsyncPipe, RouterLink, RouterOutlet, LoaderSpinnerComponent],
  templateUrl: './artists-page.component.html',
  styleUrl: './artists-page.component.scss',
  host: {
    class: 'artists',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistsPageComponent {
  private jamendoArtistsService = inject(JamendoArtistsService);
  private loadingService = inject(LoadingService);

  public notificationService = inject(NotificationService);

  public artists$: Observable<Artist[]> = this.jamendoArtistsService.artists$;
  public loading = this.loadingService.isLoaderActive('artists');
}
