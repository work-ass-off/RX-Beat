import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { type Observable } from 'rxjs';
import type { Album } from '../../../../../models';
import { AsyncPipe } from '@angular/common';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { AlbumComponent } from '../../../../shared/album/album.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoaderSpinnerComponent } from '../../../../shared/loader-spinner/loader-spinner.component';
import { JamendoAbstractService } from '../../../../../services/jamendo/jamendo-abstract/jamendo-abstract.service';

@Component({
  selector: 'app-albums-page',
  imports: [AlbumComponent, AsyncPipe, AlbumComponent, RouterLink, RouterOutlet, LoaderSpinnerComponent],
  templateUrl: './albums-page.component.html',
  styleUrl: './albums-page.component.scss',
  host: {
    class: 'two-columns',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsPageComponent {
  private _jamendoService = inject(JamendoAbstractService);
  private _loadingService = inject(LoadingService);

  public notificationService = inject(NotificationService);
  public loading = this._loadingService.isLoaderActive('albums');

  public albums$: Observable<Album[]> = this._jamendoService.data$;
}
