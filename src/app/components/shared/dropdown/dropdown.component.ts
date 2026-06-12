import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { DropdownService } from '../../../services/dropdown/dropdown.service';
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import type { Dropdown } from '../../../models/dropdown.model';

@Component({
  selector: 'app-dropdown',
  imports: [DropdownItemComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DropdownService],
  host: {
    class: 'dropdown',
  },
})
export class DropdownComponent {
  private _isOpen = signal<boolean>(false);
  public isOpen = this._isOpen.asReadonly();
  public dropdown = input.required<Dropdown>();
  public itemSelect = output<Event>();

  protected handleItemClick = (event: Event): void => {
    this.itemSelect.emit(event);
    this._isOpen.set(false);
  };

  public open(): void {
    this._isOpen.update((prev) => !prev);
  }
}
