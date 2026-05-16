import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
  private jamendoTracksService = inject(JamendoTracksService);
  searchTerm = signal('');
  onSubmit() {
    console.log(this.searchTerm());
    this.jamendoTracksService.query.set(this.searchTerm());
    this.jamendoTracksService.tracksResource.reload();
  }
}
