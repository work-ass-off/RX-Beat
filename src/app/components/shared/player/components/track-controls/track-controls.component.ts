import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Controls } from '../../player.model';
import { PlayerStoreService } from '../../../../../services/store/player-store/player-store.service';

@Component({
  selector: 'app-track-controls',
  imports: [],
  templateUrl: './track-controls.component.html',
  styleUrl: './track-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackControlsComponent {
  private readonly playerStoreService = inject(PlayerStoreService);
  protected readonly isPlaying = this.playerStoreService.isPlaying;
  protected readonly currentTrackIndex = this.playerStoreService.currentTrackIndexInQueue;
  protected readonly Controls = Controls;
  protected readonly currentQueue = this.playerStoreService.currentQueue;
  protected readonly currentTrack = this.playerStoreService.currentTrack;

  protected togglePlay(): void {
    this.playerStoreService.togglePlay();
  }

  protected setNextTrackFromQueue(): void {
    this.playerStoreService.setNextTrackFromQueue();
  }

  protected setPreviousTrackFromQueue(): void {
    this.playerStoreService.setPreviousTrackFromQueue();
  }
}
