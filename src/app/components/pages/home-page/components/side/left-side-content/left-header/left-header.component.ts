import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '../../../../../../../services/sidebar/sidebar.service';
import { FiltersCarouselComponent } from '../../../../../../shared/filters-carousel/filters-carousel.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-left-header',
  imports: [FiltersCarouselComponent, TranslatePipe],
  templateUrl: './left-header.component.html',
  styleUrl: './left-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftHeaderComponent {
  private sidebarService = inject(SidebarService);

  public isCollapsed = this.sidebarService.isCollapsed;

  public myFilters = [
    'MAIN.SIDEBAR.MY_LIBRARY.FILTERS.PLAYLISTS',
    'MAIN.SIDEBAR.MY_LIBRARY.FILTERS.ARTISTS',
    'MAIN.SIDEBAR.MY_LIBRARY.FILTERS.ALBUMS',
    'MAIN.SIDEBAR.MY_LIBRARY.FILTERS.PODCASTS',
  ];

  public onFilterChange(selected: string): void {
    // TODO: For Debugging
    console.log(selected);
  }
}
