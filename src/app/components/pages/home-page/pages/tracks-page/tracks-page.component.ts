import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrackComponent } from '../../../../shared/track/track.component';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { map, tap, type Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoaderSpinnerComponent } from '../../../../shared/loader-spinner/loader-spinner.component';
import { PlayerStoreService } from '../../../../../services/store/player-store/player-store.service';
import { JamendoAbstractService } from '../../../../../services/jamendo/jamendo-abstract/jamendo-abstract.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Track } from '../../../../../models';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-tracks-page',
  imports: [TrackComponent, AsyncPipe, LoaderSpinnerComponent, RouterLink],
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.scss',
  host: {
    class: 'tracks',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TracksPageComponent {
  private _jamendoService = inject(JamendoAbstractService);
  private _loadingService = inject(LoadingService);

  private _activatedRoute = inject(ActivatedRoute);

  private playerStoreService = inject(PlayerStoreService);
  private _authService = inject(AuthService);

  public isAuthorized = this._authService.isLoggedIn;
  public loading = this._loadingService.isLoaderActive('tracks');

  public tracks$: Observable<Track[]> = this._activatedRoute.paramMap.pipe(
    map((params) => {
      const routePath = this._activatedRoute.snapshot.parent?.url[0]?.path || '';
      return { id: params.get('id'), routePath: routePath };
    }),
    switchMap(({ id, routePath }) => {
      if (id) {
        return this._jamendoService.getDataById(id).pipe(
          map((album) => album?.tracks ?? []),
          tap((tracks) => {
            if (routePath.includes('albums')) {
              this.playerStoreService.setAlbumQueue(tracks, true);
            } else if (routePath.includes('artists')) {
              this.playerStoreService.setArtistQueue(tracks, true);
            } else if (routePath.includes('playlists')) {
              this.playerStoreService.setPlaylistQueue(tracks, true);
            }
          }),
        );
      }
      return this._jamendoService.data$.pipe(
        tap((tracks) => this.playerStoreService.setPopularTracksQueue(tracks, true)),
      );
    }),
  );
}
