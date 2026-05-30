import { ChangeDetectionStrategy, Component, inject, type OnChanges } from '@angular/core';
import { DropdownService } from '../../../../services/dropdown/dropdown.service';

@Component({
  selector: 'app-dropdown-content',
  imports: [],
  templateUrl: './dropdown-content.component.html',
  styleUrl: './dropdown-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dropdown-content',
  },
})
export class DropdownContentComponent implements OnChanges {
  private dropdownService = inject(DropdownService);
  public isOpen = this.dropdownService.open;

  public ngOnChanges(): void {
    console.log(this.isOpen());
  }
}
