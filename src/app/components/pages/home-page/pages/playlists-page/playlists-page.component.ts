import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { type Observable } from 'rxjs';
import type { Playlist } from '../../../../../models';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { RxBeatApiService } from '../../../../../services/rx-beat-api/rx-beat-api.service';
import { LoaderSpinnerComponent } from '../../../../shared/loader-spinner/loader-spinner.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NewPlaylistBtnComponent } from '../../../../shared/new-playlist-btn/new-playlist-btn.component';

@Component({
  selector: 'app-playlists-page',
  imports: [RouterOutlet, LoaderSpinnerComponent, AsyncPipe, NewPlaylistBtnComponent],
  templateUrl: './playlists-page.component.html',
  styleUrl: './playlists-page.component.scss',
  host: {
    class: 'two-columns',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistsPageComponent {
  private _rxBeatApiService = inject(RxBeatApiService);
  private _loadingService = inject(LoadingService);
  public router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  public activeTracks = signal<string[]>([]);
  public loading = this._loadingService.isLoaderActive('playlists');

  public playlists$: Observable<Playlist[]> = this._rxBeatApiService.playlists$;

  public navigateToPlaylist(playlist: Playlist): void {
    this.activeTracks.set(playlist.tracks);
    this.router.navigate([playlist.id], { relativeTo: this.activatedRoute });
  }
}
