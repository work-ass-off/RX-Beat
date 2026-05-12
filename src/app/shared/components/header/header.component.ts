import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { App } from '../../../app';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'header[app-header]',
  imports: [SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private app = inject(App);

  title = this.app.title;
}
