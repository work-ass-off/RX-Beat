import type { ElementRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, effect, inject, viewChild } from '@angular/core';
import { PlayerStoreService } from '../../../services/store/player-store/player-store.service';
import { TrackControlsComponent } from './components/track-controls/track-controls.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-player',
  imports: [TrackControlsComponent, ProgressBarComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  public readonly trackStoreService = inject(PlayerStoreService);
  public readonly track = this.trackStoreService.currentTrack;
  public readonly audio = viewChild<ElementRef<HTMLAudioElement>>('audioPlayer');

  constructor() {
    this.trackStoreService.setTrack({
      id: 'local-1',
      name: 'Local Track',
      duration: 231.327347,
      artist_id: 'local-artist',
      artist_name: 'Local Artist',
      album_id: 'local-album',
      album_name: 'Local Album',
      image: '/assets/gif/black-cat.gif',
      audio: '/ivanushki-international_-_topolinyy-puh.mp3',
    });

    effect(() => {
      const audioElementRef = this.audio();
      this.trackStoreService.audio.set(audioElementRef?.nativeElement ?? null);
    });
  }

  public updateProgress(): void {
    this.trackStoreService.updateProgress();
  }

  public onTrackEnded(): void {
    this.trackStoreService.isPlaying.set(false);
    this.trackStoreService.currentTrackCurrentTime$.next(0);
  }
}
