import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { DropdownItem } from '../model/dropdown.model';

@Component({
  selector: 'app-dropdown-item',
  imports: [],
  templateUrl: './dropdown-item.component.html',
  styleUrl: './dropdown-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dropdown-item',
  },
})
export class DropdownItemComponent {
  public item = input.required<DropdownItem>();
}
