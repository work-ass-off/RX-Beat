import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { JamendoAutocompleteService } from '../../../services/jamendo/jamendo-autocomplete/jamendo-autocomplete.service';
import { AsyncPipe } from '@angular/common';
import { SearchService } from '../../../services/search/search.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule, TranslatePipe, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private _searchService = inject(SearchService);
  private _jamendoAutocompleteService = inject(JamendoAutocompleteService);

  public isAutocompleteOpen = this._jamendoAutocompleteService.isAutocompleteOpen.asReadonly();
  public autocomplete$ = this._jamendoAutocompleteService.autocomplete$;
  public query = this._jamendoAutocompleteService.queryData.asReadonly();
  public getItem = this._jamendoAutocompleteService.getAutocompleteItem;

  public isOpened(value: boolean): void {
    this._jamendoAutocompleteService.isAutocompleteOpen.set(value);
  }

  public onTypeSearch(search: string): void {
    this._jamendoAutocompleteService.isAutocompleteOpen.set(true);
    this._jamendoAutocompleteService.queryData.set(search);
  }

  public onConfirmSearch(search: string): void {
    this._jamendoAutocompleteService.queryData.set(search);
    this._searchService.searchQuery.set(search);
    this._jamendoAutocompleteService.isAutocompleteOpen.set(false);
  }
}
