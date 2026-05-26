import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import type { LibraryItemProps } from '../../../models/library.models';
import { SidebarService } from '../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-library-card',
  imports: [],
  templateUrl: './library-card.component.html',
  styleUrl: './library-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {},
})
export class LibraryCardComponent {
  private sidebarService = inject(SidebarService);
  public card = input.required<LibraryItemProps>();

  public readonly isCollapsed = this.sidebarService.isCollapsed;
}
