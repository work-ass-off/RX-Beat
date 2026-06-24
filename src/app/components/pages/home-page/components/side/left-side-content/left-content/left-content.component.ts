import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import type { LibraryItemProps } from '../../../../../../../models/';
import { mockLibraryItems } from '../mock/data';
import { LibraryCardComponent } from '../../../../../../shared/library-card/library-card.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../../services/auth/auth.service';

@Component({
  selector: 'app-left-content',
  imports: [LibraryCardComponent],
  templateUrl: './left-content.component.html',
  styleUrl: './left-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftContentComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public mockCards = signal<LibraryItemProps[]>(mockLibraryItems);

  public readonly isUserLogged = this.authService.isLoggedIn;

  public onLogin(): void {
    this.router.navigate(['/login']);
  }
}
