import { ChangeDetectionStrategy, Component, inject, type InputSignal } from '@angular/core';
import { TrackComponent } from '../../../../../shared/track/track.component';
import { LoadingService } from '../../../../../../services/loading/loading.service';
import { of, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoaderSpinnerComponent } from '../../../../../shared/loader-spinner/loader-spinner.component';
import { JamendoPlaylistService } from '../../../../../../services/jamendo/jamendo-playlist/jamendo-playlist.service';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { PlayerStoreService } from '../../../../../../services/store/player-store/player-store.service';

@Component({
  selector: 'app-playlists-tracks',
  imports: [TrackComponent, AsyncPipe, LoaderSpinnerComponent],
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
  private playerStoreService = inject(PlayerStoreService);

  public tracksIds = inject<InputSignal<string[]>>(ROUTER_OUTLET_DATA);
  public loading = this._loadingService.isLoaderActive('tracks');

  public tracks$ = toObservable(this.tracksIds).pipe(
    switchMap((ids) => (ids.length ? this._jamendoService.getPlaylistTracks(ids) : of([]))),
    tap((tracks) => this.playerStoreService.setPlaylistQueue(tracks, true)),
  );
}
