import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PlayerStoreService } from '../../../services/store/player-store/player-store.service';
import type { JamendoTrack } from '../../../models/jamendo.model';
import { JamendoTracksService } from '../../../services/jamendo/jamendo-tracks/jamendo-tracks.service';

@Component({
  selector: 'app-jamendo',
  imports: [],
  templateUrl: './jamendo.component.html',
  styleUrl: './jamendo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JamendoComponent {
  public jamendoTracksService = inject(JamendoTracksService);
  private trackStoreService = inject(PlayerStoreService);

  tracks = this.jamendoTracksService.tracksResource;

  onClick(track: JamendoTrack): void {
    this.trackStoreService.setTrack(track);
  }
}
