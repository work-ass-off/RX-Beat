import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RxBeatApiService } from '../../../services/rx-beat-api/rx-beat-api.service';
import { type Observable } from 'rxjs';
import type { Playlist } from '../../../models';
import { NotificationService } from '../../../services/notification/notification.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-playlist-menu',
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './playlist-menu.component.html',
  styleUrl: './playlist-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistMenuComponent {
  private readonly RxBeatApiService = inject(RxBeatApiService);
  protected notificationService = inject(NotificationService);

  public playlists$: Observable<Playlist[]> = this.RxBeatApiService.playlists$;
}
