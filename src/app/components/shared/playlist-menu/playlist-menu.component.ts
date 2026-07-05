import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RxBeatApiService } from '../../../services/rx-beat-api/rx-beat-api.service';
import { type Observable } from 'rxjs';
import type { Playlist } from '../../../models';
import { NotificationService } from '../../../services/notification/notification.service';
import { AsyncPipe } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { NewPlaylistBtnComponent } from '../new-playlist-btn/new-playlist-btn.component';

@Component({
  selector: 'app-playlist-menu',
  imports: [AsyncPipe, CdkMenuTrigger, CdkMenu, CdkMenuItem, NewPlaylistBtnComponent],
  templateUrl: './playlist-menu.component.html',
  styleUrl: './playlist-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistMenuComponent {
  private readonly RxBeatApiService = inject(RxBeatApiService);
  protected notificationService = inject(NotificationService);

  public trackId = input<string>('1157362');

  public playlists$: Observable<Playlist[]> = this.RxBeatApiService.playlists$;

  public deletePlaylist(id: string): void {
    this.RxBeatApiService.deletePlaylist(id).subscribe({
      next: () => {
        this.RxBeatApiService.refreshPlaylists();
      },
      error: () => {
        this.notificationService.show('Failed to delete playlist. Please try again later');
      },
    });
  }
  public togglePlaylist(playlistId: string, isIncluded: boolean): void {
    if (playlistId) {
      if (isIncluded) {
        this.RxBeatApiService.removeTrackFromPlaylist(playlistId, this.trackId()).subscribe();
        this.RxBeatApiService.refreshPlaylists();
      } else {
        console.log('Adding track to playlist:', playlistId, this.trackId());
        this.RxBeatApiService.addTrackToPlaylist(playlistId, this.trackId()).subscribe();
        this.RxBeatApiService.refreshPlaylists();
      }
    }
  }
}
