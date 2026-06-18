import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'footer[app-footer]',
  imports: [PlayerComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly authService = inject(AuthService);
  protected readonly isLoggedIn = computed(() => this.authService.isLoggedIn());
}
