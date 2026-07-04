import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchComponent } from '../../../../shared/search/search.component';
import { AuthService } from '../../../../../services/auth/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  imports: [RouterOutlet, SearchComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLayoutComponent {
  private authService = inject(AuthService);

  public isAuthorized = this.authService.isLoggedIn;
}
