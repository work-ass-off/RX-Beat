import { Directive, inject } from '@angular/core';
import { DropdownService } from '../../services/dropdown/dropdown.service';

@Directive({
  selector: '[appDropDownTrigger]',
  host: {
    '(click)': 'toggleDropdown()',
  },
})
export class DropDownTriggerDirective {
  private dropdownService = inject(DropdownService);

  public toggleDropdown(): void {
    this.dropdownService.toggle();
  }
}
