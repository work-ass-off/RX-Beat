import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JamendoTracksService } from '../../../services/jamendo/jamendo-tracks/jamendo-tracks.service';
import { LoaderComponent } from '../loader/loader.component';
import { TrackCardComponent } from '../track-card/track-card.component';

@Component({
  selector: 'app-jamendo',
  imports: [LoaderComponent, TrackCardComponent],
  templateUrl: './jamendo.component.html',
  styleUrl: './jamendo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JamendoComponent {
  public jamendoTracksService = inject(JamendoTracksService);

  public tracks = this.jamendoTracksService.tracksResource;
}
