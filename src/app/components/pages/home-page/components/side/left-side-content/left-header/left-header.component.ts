import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '../../../../../../../services/sidebar/sidebar.service';
import { FiltersCarouselComponent } from '../../../../../../shared/filters-carousel/filters-carousel.component';

@Component({
  selector: 'app-left-header',
  imports: [FiltersCarouselComponent],
  templateUrl: './left-header.component.html',
  styleUrl: './left-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftHeaderComponent {
  private sidebarService = inject(SidebarService);

  public isCollapsed = this.sidebarService.isCollapsed;

  protected myFilters = ['Плейлисты', 'Исполнители', 'Альбомы', 'Подкасты', 'Аудиокниги', 'Для вас'];

  protected onFilterChange(selected: string) {
    // TODO: For Debugging
    console.log(selected);
  }
}
