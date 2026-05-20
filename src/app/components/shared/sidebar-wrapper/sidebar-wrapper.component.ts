import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar-wrapper',
  imports: [NgClass],
  templateUrl: './sidebar-wrapper.component.html',
  styleUrl: './sidebar-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SidebarService],
  exportAs: 'sidebarWrapper',
  host: {
    '(mouseenter)': 'showArrow = true',
    '(mouseleave)': 'showArrow = false',
  },
})
export class SidebarWrapperComponent {
  private sidebarService = inject(SidebarService);
  public expandedWidth = input('280px');
  public isCollapsed = this.sidebarService.isCollapsed;
  public showArrow = false;

  public toggle() {
    this.sidebarService.toggle();
  }
}
