import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { LibraryItemProps } from '../../../../../../../models/library.models';
import { mockLibraryItems } from '../mock/data';
import { LibraryCardComponent } from '../../../../../../shared/library-card/library-card.component';

@Component({
  selector: 'app-left-content',
  imports: [LibraryCardComponent],
  templateUrl: './left-content.component.html',
  styleUrl: './left-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftContentComponent {
  public mockCards = signal<LibraryItemProps[]>(mockLibraryItems);
}
