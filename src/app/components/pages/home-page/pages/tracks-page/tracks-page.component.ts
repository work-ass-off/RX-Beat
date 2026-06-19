import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { JamendoTracksService } from '../../../../../services/jamendo/jamendo-tracks/jamendo-tracks.service';

@Component({
  selector: 'app-tracks-page',
  imports: [ContentComponent],
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TracksPageComponent {
  private jamendoTracksService = inject(JamendoTracksService);

  private tracksSignal = toSignal(this.jamendoTracksService.getTracks(), { initialValue: [] });
}
