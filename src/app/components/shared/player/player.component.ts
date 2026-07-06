import type { ElementRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, effect, inject, viewChild } from '@angular/core';
import { PlayerStoreService } from '../../../services/store/player-store/player-store.service';
import { TrackControlsComponent } from './components/track-controls/track-controls.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { TrackTimeComponent } from './components/track-time/track-time.component';
import { TrackPreviewComponent } from './components/track-preview/track-preview.component';

@Component({
  selector: 'app-player',
  imports: [TrackControlsComponent, ProgressBarComponent, TrackTimeComponent, TrackPreviewComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  public readonly playerStoreService = inject(PlayerStoreService);
  public readonly track = this.playerStoreService.currentTrack;
  public readonly audio = viewChild<ElementRef<HTMLAudioElement>>('audioPlayer');

  constructor() {
    effect((onCleanup) => {
      const audioElement = this.audio()?.nativeElement;
      const track = this.track();
      const shouldPlay = this.playerStoreService.isPlaying();

      if (!audioElement || !track) {
        return;
      }

      if (!shouldPlay) {
        audioElement.pause();
        return;
      }

      const playAudio = (): void => {
        void audioElement.play().catch((error) => {
          console.error('Audio play() failed:', error);
          this.playerStoreService.isPlaying.set(false);
        });
      };

      if (audioElement.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        playAudio();
      } else {
        const onCanPlay = (): void => {
          playAudio();
        };

        audioElement.addEventListener('canplay', onCanPlay, { once: true });
        onCleanup(() => audioElement.removeEventListener('canplay', onCanPlay));
      }
    });

    effect(() => {
      const audioElementRef = this.audio();
      this.playerStoreService.audio.set(audioElementRef?.nativeElement ?? null);
    });
  }

  public updateProgress(): void {
    this.playerStoreService.updateProgress();
  }

  public onTrackEnded(): void {
    this.playerStoreService.resetTrackTiming();
    this.playerStoreService.setNextTrackFromQueue();
  }

  public toggleQueue(): void {
    this.playerStoreService.setQueueOfPlayedTracks(this.playerStoreService.queueOfPlayedTracks(), true);
  }
}
