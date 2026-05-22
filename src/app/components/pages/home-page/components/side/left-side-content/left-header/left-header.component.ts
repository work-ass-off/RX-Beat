import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '../../../../../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-left-header',
  imports: [],
  templateUrl: './left-header.component.html',
  styleUrl: './left-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftHeaderComponent {
  private sidebarService = inject(SidebarService);

  public isCollapsed = this.sidebarService.isCollapsed;
}
