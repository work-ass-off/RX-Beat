import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JamendoTracksService } from '../../../../../services/jamendo/jamendo-tracks/jamendo-tracks.service';
import { TrackComponent } from '../../../../shared/track/track.component';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { map, switchMap, tap, type Observable } from 'rxjs';
import type { Track } from '../../../../../models';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JamendoAlbumsService } from '../../../../../services/jamendo/jamendo-albums/jamendo-albums.service';
import { JamendoArtistsService } from '../../../../../services/jamendo/jamendo-artists/jamendo-artists.service';
import { LoaderSpinnerComponent } from '../../../../shared/loader-spinner/loader-spinner.component';
import { PlayerStoreService } from '../../../../../services/store/player-store/player-store.service';

@Component({
  selector: 'app-tracks-page',
  imports: [TrackComponent, AsyncPipe, LoaderSpinnerComponent],
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.scss',
  host: {
    class: 'tracks',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TracksPageComponent {
  private jamendoTracksService = inject(JamendoTracksService);
  private jamendoAlbumsService = inject(JamendoAlbumsService);
  private jamendoArtistsService = inject(JamendoArtistsService);

  private loadingService = inject(LoadingService);
  private route = inject(ActivatedRoute);

  private playerStoreService = inject(PlayerStoreService);

  public notificationService = inject(NotificationService);

  constructor() {}

  public loading = this.loadingService.isLoaderActive('tracks');



  public tracks$: Observable<Track[]> = this.route.paramMap.pipe(
    map((params) => ({
      album: params.get('albumId'),
      artist: params.get('artistId'),
    })),
    switchMap((params) => {
      if (params.album) {
        return this.jamendoAlbumsService.getAlbumWithTracks(params.album).pipe(
          map((album) => album?.tracks ?? []),
          tap((tracks) => this.playerStoreService.setAlbumQueue(tracks, true)),
        );
      }
      if (params.artist) {
        return this.jamendoArtistsService
          .getArtistWithTracks(params.artist)
          .pipe(
            map((artist) => artist?.tracks ?? []),
            tap((tracks) => this.playerStoreService.setPopularTracksQueue(tracks, true)),
          );
      }
      return this.jamendoTracksService.tracks$;
      return this.jamendoTracksService
        .getTracks()
        .pipe(tap((tracks) => this.playerStoreService.setPopularTracksQueue(tracks, true)));
    }),
  );
}
