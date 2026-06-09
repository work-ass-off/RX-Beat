import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PlayerStoreService } from '../../../services/store/player-store/player-store.service';
import { Controls } from './player.model';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  public readonly Controls = Controls;

  public trackStoreService = inject(PlayerStoreService);
  public track = this.trackStoreService.currentTrack;
  public isPlaying = signal(false);

  public togglePlay(): void {
    this.isPlaying.set(!this.isPlaying());
  }
}
