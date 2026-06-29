import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JamendoTracksService } from '../../../services/jamendo/jamendo-tracks/jamendo-tracks.service';
import { TranslatePipe } from '@ngx-translate/core';
import { JamendoAutocompleteService } from '../../../services/jamendo/jamendo-autocomplete/jamendo-autocomplete.service';
import { JamendoAlbumsService } from '../../../services/jamendo/jamendo-albums/jamendo-albums.service';
import { AsyncPipe } from '@angular/common';
import { JamendoArtistsService } from '../../../services/jamendo/jamendo-artists/jamendo-artists.service';
import { RoutingService } from '../../../services/routing/routing.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule, TranslatePipe, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private jamendoTracksService = inject(JamendoTracksService);
  private jamendoArtistsService = inject(JamendoArtistsService);
  private jamendoAlbumsService = inject(JamendoAlbumsService);
  private jamendoAutocompleteService = inject(JamendoAutocompleteService);
  private routingService = inject(RoutingService);

  public isAutocompleteOpen = this.jamendoAutocompleteService.isAutocompleteOpen.asReadonly();
  public autocomplete$ = this.jamendoAutocompleteService.autocomplete$;
  public query = this.jamendoAutocompleteService.queryData.asReadonly();
  public getItem = this.jamendoAutocompleteService.getAutocompleteItem;

  public isOpened(value: boolean): void {
    this.jamendoAutocompleteService.isAutocompleteOpen.set(value);
  }

  public onTypeSearch(search: string): void {
    this.jamendoAutocompleteService.isAutocompleteOpen.set(true);
    this.jamendoAutocompleteService.queryData.set(search);
  }

  public onConfirmSearch(search: string): void {
    this.jamendoAutocompleteService.queryData.set(search);
    const currentPath = this.routingService.path();

    switch (currentPath) {
      case 'tracks':
        // * Tracks Logic

        this.jamendoTracksService.activeTracksSearch.set(search);
        break;
      case 'albums':
        // * Albums Logic

        this.jamendoAlbumsService.activeAlbumsSearch.set(search);
        break;
      case 'artists':
        // * Artist Logic

        this.jamendoArtistsService.activeArtistsSearch.set(search);
        break;
    }
    this.jamendoAutocompleteService.isAutocompleteOpen.set(false);
  }
}
