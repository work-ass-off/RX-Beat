import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DropdownService } from '../../../services/dropdown/dropdown.service';
import { DropdownContentComponent } from './dropdown-content/dropdown-content.component';
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import { DropDownTriggerDirective } from '../../../directives/drop-down-trigger/drop-down-trigger.directive';

@Component({
  selector: 'app-dropdown',
  imports: [DropdownContentComponent, DropdownItemComponent, DropDownTriggerDirective],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DropdownService],
  host: {
    class: 'dropdown',
  },
})
export class DropdownComponent {}
