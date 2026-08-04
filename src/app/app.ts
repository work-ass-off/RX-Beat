import { Component, computed, inject } from '@angular/core';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { ToastComponent } from './components/shared/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { class: 'container' },
})
export class App {
  protected readonly authService = inject(AuthService);
  protected readonly isLoggedIn = computed(() => this.authService.isLoggedIn());
}
