import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JamendoAlbumsService } from '../../../../../services/jamendo/jamendo-albums/jamendo-albums.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Subject, switchMap, tap, type Observable } from 'rxjs';
import type { Album } from '../../../../../models';
import { AsyncPipe } from '@angular/common';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { AlbumComponent } from '../../../../shared/album/album.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoaderSpinnerComponent } from '../../../../shared/loader-spinner/loader-spinner.component';
import { Store } from '@ngrx/store';
import { AlbumActions } from '../../../../../store/albums/album.actions';
import { selectTracksByAlbumId } from '../../../../../store/track/track.selectors';
import { PlayerStoreService } from '../../../../../services/store/player-store/player-store.service';

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
  private store = inject(Store);
  //container to store tracks of selected album, which will be used to set the album queue in player store service
  private selectedAlbumId$ = new Subject<string>();
  private playerStoreService = inject(PlayerStoreService);

  public notificationService = inject(NotificationService);

  public albums$: Observable<Album[]> = this.jamendoAlbumsService.albums$;
  public loading = this.loadingService.isLoaderActive('albums');

  public selectedAlbumTracks$ = this.selectedAlbumId$.pipe(
    switchMap((albumId) => this.store.select(selectTracksByAlbumId(albumId))),
    tap((tracks) => {
      //setting tracks to album queue in player store service
      this.playerStoreService.setAlbumQueue(tracks, true);
    }),
  );

  public constructor() {
    this.selectedAlbumTracks$.pipe(takeUntilDestroyed()).subscribe();
  }

  public onAlbumSelect(albumId: string): void {
    this.store.dispatch(AlbumActions.loadAlbumWithTracks({ albumId }));
    this.selectedAlbumId$.next(albumId);
    
  }
}
