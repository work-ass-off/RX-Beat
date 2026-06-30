import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JamendoTracksService } from '../../../services/jamendo/jamendo-tracks/jamendo-tracks.service';
import { LoaderComponent } from '../loader/loader.component';
import { TrackCardComponent } from '../track-card/track-card.component';
import { LoadingService } from '../../../services/loading/loading.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-jamendo',
  imports: [LoaderComponent, TrackCardComponent, AsyncPipe],
  templateUrl: './jamendo.component.html',
  styleUrl: './jamendo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JamendoComponent {
  private jamendoTracksService = inject(JamendoTracksService);
  private loadingService = inject(LoadingService);

  // public tracks = this.jamendoTracksService.tracksResource;
  public tracks$ = this.jamendoTracksService.tracks$;
  public loading = this.loadingService.isLoaderActive('tracks');
}
