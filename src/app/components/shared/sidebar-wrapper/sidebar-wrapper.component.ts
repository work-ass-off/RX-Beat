import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar-wrapper',
  imports: [],
  templateUrl: './sidebar-wrapper.component.html',
  styleUrl: './sidebar-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SidebarService],
  exportAs: 'sidebarWrapper',
  host: {
    '[class.collapsed]': 'isCollapsed()',
    '[style.width]': 'isCollapsed() ? "72px" : expandedWidth()',
  },
})
export class SidebarWrapperComponent {
  private sidebarService = inject(SidebarService);
  public expandedWidth = input('420px');
  public isCollapsed = this.sidebarService.isCollapsed;

  public toggle(): void {
    this.sidebarService.toggle();
  }
}
