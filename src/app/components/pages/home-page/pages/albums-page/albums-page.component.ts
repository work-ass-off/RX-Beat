import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JamendoAlbumsService } from '../../../../../services/jamendo/jamendo-albums/jamendo-albums.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import type { Observable } from 'rxjs';
import type { Album } from '../../../../../models';
import { AsyncPipe } from '@angular/common';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { AlbumComponent } from '../../../../shared/album/album.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoaderSpinnerComponent } from '../../../../shared/loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-albums-page',
  imports: [AlbumComponent, AsyncPipe, AlbumComponent, RouterLink, RouterOutlet, LoaderSpinnerComponent],
  templateUrl: './albums-page.component.html',
  styleUrl: './albums-page.component.scss',
  host: {
    class: 'albums',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsPageComponent {
  private jamendoAlbumsService = inject(JamendoAlbumsService);
  private loadingService = inject(LoadingService);

  public notificationService = inject(NotificationService);

  public albums$: Observable<Album[]> = this.jamendoAlbumsService.albums$;
  public loading = this.loadingService.isLoaderActive('albums');
}
