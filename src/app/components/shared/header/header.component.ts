import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { App } from '../../../app';
import { SearchComponent } from '../search/search.component';
import { THEME } from '../../../shared/theme/theme';

@Component({
  selector: 'header[app-header]',
  imports: [SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private app = inject(App);
  private theme = inject(THEME);
  public currentTheme = computed(() => this.theme());

  title = this.app.title;

  toggleTheme() {
    this.theme.toggle();
  }
}
