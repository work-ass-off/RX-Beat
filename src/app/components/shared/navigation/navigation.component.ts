import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'nav[app-navigation]',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  public readonly isLoggedIn = this.authService.isLoggedIn;

  public onLogout(): void {
    this.router.navigate(['/']);
    this.authService.logout();
  }

  public onLoginNavigation(): void {
    this.router.navigate(['/login']);
  }
}
