import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RxBeatApiService } from '../../../services/rx-beat-api/rx-beat-api.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../services/notification/notification.service';
import { type Observable } from 'rxjs';
import type { Playlist } from '../../../models/';

@Component({
  selector: 'app-api-page',
  imports: [AsyncPipe, JsonPipe, ReactiveFormsModule],
  templateUrl: './api-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'page',
  },
})
export class ApiPageComponent {
  public readonly RxBeatApiService = inject(RxBeatApiService);
  public readonly fb = inject(FormBuilder);
  public notificationService = inject(NotificationService);

  public playlists$: Observable<Playlist[]> = this.RxBeatApiService.getPlaylists();

  public playlistForm = this.fb.group({
    name: ['', Validators.required],
  });

  public onPlaylistCreate(): void {
    this.notificationService.clear();
    const data = this.playlistForm.value.name ?? '';
    this.RxBeatApiService.createPlaylist({ name: data }).subscribe();
    this.playlistForm.reset();
    this.playlists$ = this.RxBeatApiService.getPlaylists();
  }
}
