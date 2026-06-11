import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeButtonComponent } from '../theme-button/theme-button.component';
import { LanguageDirective } from '../../../directives/language/language.directive';
import { UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'header[app-header]',
  imports: [ThemeButtonComponent, LanguageDirective, UpperCasePipe, RouterLink, NavigationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private router = inject(Router);

  public onLogin(): void {
    this.router.navigate(['/login']);
  }
}
