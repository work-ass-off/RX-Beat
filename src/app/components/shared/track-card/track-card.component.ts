import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import type { Track } from '../../../models/';
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
  public track = input.required<Track>();

  private trackStoreService = inject(PlayerStoreService);

  public onClick(): void {
    this.trackStoreService.setTrack(this.track());
  }
}
