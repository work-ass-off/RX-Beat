import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PlayerService } from '../../../services/player/player.service';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  private trackService = inject(PlayerService);

  track = this.trackService.currentTrack;
}
