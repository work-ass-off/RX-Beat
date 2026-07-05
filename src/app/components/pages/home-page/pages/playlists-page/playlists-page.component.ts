import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { type Observable } from 'rxjs';
import type { Playlist } from '../../../../../models';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { JamendoPlaylistService } from '../../../../../services/jamendo/jamendo-playlist/jamendo-playlist.service';
import { RxBeatApiService } from '../../../../../services/rx-beat-api/rx-beat-api.service';
import { LoaderSpinnerComponent } from '../../../../shared/loader-spinner/loader-spinner.component';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-playlists-page',
  imports: [RouterOutlet, LoaderSpinnerComponent, AsyncPipe],
  templateUrl: './playlists-page.component.html',
  styleUrl: './playlists-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistsPageComponent {
  private _jamendoService = inject(JamendoPlaylistService);
  private _rxBeatApiService = inject(RxBeatApiService);
  private _loadingService = inject(LoadingService);

  public notificationService = inject(NotificationService);
  public loading = this._loadingService.isLoaderActive('playlists');

  public playlists$: Observable<Playlist[]> = this._rxBeatApiService.playlists$;
}
