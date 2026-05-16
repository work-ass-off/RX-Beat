import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PlayerStoreService } from '../../../services/store/player-store/player-store.service';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  private trackStoreService = inject(PlayerStoreService);
  track = this.trackStoreService.currentTrack;
}
