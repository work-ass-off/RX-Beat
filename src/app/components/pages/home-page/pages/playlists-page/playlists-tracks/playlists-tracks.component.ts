import { ChangeDetectionStrategy, Component, inject, type InputSignal } from '@angular/core';
import { TrackComponent } from '../../../../../shared/track/track.component';
import { LoadingService } from '../../../../../../services/loading/loading.service';
import { NotificationService } from '../../../../../../services/notification/notification.service';
import { of, switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { LoaderSpinnerComponent } from '../../../../../shared/loader-spinner/loader-spinner.component';
import { JamendoPlaylistService } from '../../../../../../services/jamendo/jamendo-playlist/jamendo-playlist.service';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-playlists-tracks',
  imports: [TrackComponent, AsyncPipe, LoaderSpinnerComponent, JsonPipe],
  templateUrl: './playlists-tracks.component.html',
  styleUrl: './playlists-tracks.component.scss',
  host: {
    class: 'artists',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistsTracksComponent {
  private _jamendoService = inject(JamendoPlaylistService);
  private _loadingService = inject(LoadingService);
  public notificationService = inject(NotificationService);

  public tracksIds = inject<InputSignal<string[]>>(ROUTER_OUTLET_DATA);
  public loading = this._loadingService.isLoaderActive('tracks');

  public tracks$ = toObservable(this.tracksIds).pipe(
    switchMap((ids) => (ids.length ? this._jamendoService.getPlaylistTracks(ids) : of([]))),
  );
}
