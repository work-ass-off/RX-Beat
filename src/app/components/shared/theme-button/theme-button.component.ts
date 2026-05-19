import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'button[app-theme-button]',
  imports: [],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'btn-icon material-icons', '(click)': 'toggle()' },
})
export class ThemeButtonComponent {
  private ThemeService = inject(ThemeService);

  toggle(): void {
    this.ThemeService.toggle();
  }
}
