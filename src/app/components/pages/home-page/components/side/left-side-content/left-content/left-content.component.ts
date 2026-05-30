import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import type { LibraryItemProps } from '../../../../../../../models/library.models';
import { mockLibraryItems } from '../mock/data';
import { LibraryCardComponent } from '../../../../../../shared/library-card/library-card.component';
import { LocalStorageService } from '../../../../../../../services/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-content',
  imports: [LibraryCardComponent],
  templateUrl: './left-content.component.html',
  styleUrl: './left-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftContentComponent {
  private localStorageService = inject(LocalStorageService);
  protected isUserLogged = signal<boolean>(!!this.localStorageService.getItem('token'));
  public mockCards = signal<LibraryItemProps[]>(mockLibraryItems);
  private router = inject(Router);

  constructor() {
    this.isUserLogged.set(!!this.localStorageService.getItem('token'));
  }

  public onLogin(): void {
    this.router.navigate(['/login']);
  }
}
