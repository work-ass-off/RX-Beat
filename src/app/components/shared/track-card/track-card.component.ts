import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import type { JamendoTrack } from '../../../models/jamendo.model';
import { PlayerStoreService } from '../../../services/store/player-store/player-store.service';

@Component({
  selector: 'app-track-card',
  imports: [],
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(mousedown)': 'onClick()' },
})
export class TrackCardComponent {
  track = input.required<JamendoTrack>();

  private trackStoreService = inject(PlayerStoreService);

  onClick(): void {
    this.trackStoreService.setTrack(this.track());
  }
}
