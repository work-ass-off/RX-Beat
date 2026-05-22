import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JamendoTracksService } from '../../../services/jamendo/jamendo-tracks/jamendo-tracks.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  public jamendoTracksService = inject(JamendoTracksService);

  public onTypeSearch(track: string): void {
    this.jamendoTracksService.isAutocompleteOpen.set(true);
    this.jamendoTracksService.query.set(track);
  }

  public onConfirmSearch(track: string): void {
    this.jamendoTracksService.query.set(track);
    this.jamendoTracksService.isAutocompleteOpen.set(false);
    this.jamendoTracksService.tracksResource.reload();
  }
}
