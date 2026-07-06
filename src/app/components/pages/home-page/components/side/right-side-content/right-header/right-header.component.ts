import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '../../../../../../../services/sidebar/sidebar.service';
import { DropdownComponent } from '../../../../../../shared/dropdown/dropdown.component';
import { DROPDOWN_CONFIG } from './config/dropdown.config';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-right-header',
  imports: [DropdownComponent, TranslatePipe],
  templateUrl: './right-header.component.html',
  styleUrl: './right-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.collapsed]': 'isCollapsed()',
  },
})
export class RightHeaderComponent {
  private sidebarService = inject(SidebarService);
  public dropdownConfig = DROPDOWN_CONFIG;

  public isCollapsed = this.sidebarService.isCollapsed;

  public toggle(): void {
    this.sidebarService.toggle();
  }

  public handelDropdown(event: Event): void {
    console.log(event.currentTarget);
  }
}
