import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JamendoService } from '../../../services/jamendo/jamendo.service';
import { AsyncPipe } from '@angular/common';
import { PlayerService } from '../../../services/player/player.service';
import type { JamendoTrack } from '../../../models/jamendo.model';

@Component({
  selector: 'app-jamendo',
  imports: [AsyncPipe],
  templateUrl: './jamendo.component.html',
  styleUrl: './jamendo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JamendoComponent {
  private jamendoService = inject(JamendoService);
  private trackService = inject(PlayerService);

  tracks$ = this.jamendoService.getPopularTracks();

  onClick(track: JamendoTrack): void {
    // this.trackService.clearTrack();
    this.trackService.setTrack(track);
  }
}
