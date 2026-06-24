import { ChangeDetectionStrategy, Component, computed, inject, type OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAlbumsLoading, selectAllAlbums } from '../../../store/albums/album.selectors';
import { selectAllArtists } from '../../../store/artists/artist.selectors';
import { selectAllTracks } from '../../../store/track/track.selectors';
import { AlbumActions } from '../../../store/albums/album.actions';

@Component({
  selector: 'app-store-page',
  imports: [],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorePageComponent implements OnInit {
  private store = inject(Store);

  // * Global Signal from Store
  public albums = this.store.selectSignal(selectAllAlbums);
  public isAlbumsLoading = this.store.selectSignal(selectAlbumsLoading);
  public artists = this.store.selectSignal(selectAllArtists);
  public allTracks = this.store.selectSignal(selectAllTracks);

  // * Locale signal for safe ID selected Album

  public selectedAlbumId = signal<string | null>(null);

  // * It select a track checked for current album only
  public currentAlbumTracks = computed(() => {
    const albumId = this.selectedAlbumId();
    if (!albumId) return [];
    return this.allTracks().filter((track) => track.album_id === albumId);
  });

  public ngOnInit(): void {
    // * Step 1: at start download albums
    this.store.dispatch(AlbumActions.loadAlbums());
  }

  public onAlbumClick(albumId: string): void {
    this.selectedAlbumId.set(albumId);
    // * Step 2: Imitate request "Loading tracks for current album"
    // * Our TracksReducer will intercept this action and extract the nested tracks from it!
    this.store.dispatch(AlbumActions.loadAlbumWithTracks({ albumId }));
  }

  public formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
