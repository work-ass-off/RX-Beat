import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { ThemeButtonComponent } from '../theme-button/theme-button.component';
import { LanguageDirective } from '../../../directives/language/language.directive';
import { UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'header[app-header]',
  imports: [SearchComponent, ThemeButtonComponent, LanguageDirective, UpperCasePipe, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
