import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import type { Observable } from 'rxjs';
import type { Artist } from '../../../../../models';
import { AsyncPipe } from '@angular/common';
import { ArtistComponent } from '../../../../shared/artist/artist.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoaderSpinnerComponent } from '../../../../shared/loader-spinner/loader-spinner.component';
import { JamendoAbstractService } from '../../../../../services/jamendo/jamendo-abstract/jamendo-abstract.service';

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
  private _jamendoService = inject(JamendoAbstractService);
  private _loadingService = inject(LoadingService);

  public notificationService = inject(NotificationService);
  public loading = this._loadingService.isLoaderActive('artists');

  public artists$: Observable<Artist[]> = this._jamendoService.data$;
}
