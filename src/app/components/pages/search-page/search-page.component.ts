import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent } from '../../shared/search/search.component';
import { JamendoComponent } from '../../shared/jamendo/jamendo.component';

@Component({
  selector: 'app-search-page',
  imports: [SearchComponent, JamendoComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {}
