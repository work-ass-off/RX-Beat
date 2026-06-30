import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import type { Track } from '../../../models';
import { TrackTimePipe } from '../../../pipes/track-time/track-time.pipe';
import { PlayerStoreService } from '../../../services/store/player-store/player-store.service';

@Component({
  selector: 'app-track',
  imports: [TrackTimePipe],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
  host: {
    class: 'track',
    '(mousedown)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackComponent {
  private playerStoreService = inject(PlayerStoreService);

  public track = input.required<Track>();
  public index = input.required<number>();

  public onClick(): void {
    this.playerStoreService.setTrack(this.track());
  }
}
