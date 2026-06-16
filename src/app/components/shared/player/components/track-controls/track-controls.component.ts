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
  protected readonly trackStoreService = inject(PlayerStoreService);
  protected readonly Controls = Controls;

  protected togglePlay(): void {
    this.trackStoreService.togglePlay();
  }
}
