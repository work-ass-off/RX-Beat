import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '../../../../../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-right-header',
  imports: [],
  templateUrl: './right-header.component.html',
  styleUrl: './right-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.collapsed]': 'isCollapsed()',
  },
})
export class RightHeaderComponent {
  private sidebarService = inject(SidebarService);

  public isCollapsed = this.sidebarService.isCollapsed;

  public toggle(): void {
    this.sidebarService.toggle();
  }
}
