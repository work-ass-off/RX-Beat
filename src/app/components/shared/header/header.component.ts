import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { ThemeButtonComponent } from '../theme-button/theme-button.component';
import { LanguageDirective } from '../../../directives/language/language.directive';
import { UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header[app-header]',
  imports: [SearchComponent, ThemeButtonComponent, LanguageDirective, UpperCasePipe, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private router = inject(Router);

  onLogin(): void {
    this.router.navigate(['/login']);
  }
}
