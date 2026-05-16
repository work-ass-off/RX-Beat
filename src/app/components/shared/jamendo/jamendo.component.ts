import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PlayerService } from '../../../services/player/player.service';
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
  private trackService = inject(PlayerService);

  tracks = this.jamendoTracksService.popularTracksResource;

  onClick(track: JamendoTrack): void {
    this.trackService.setTrack(track);
  }
}
