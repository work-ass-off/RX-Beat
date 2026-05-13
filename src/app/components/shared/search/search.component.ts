import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { App } from '../../../app';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private app = inject(App);
  searchTerm = signal('');

  onSubmit() {
    this.app.changeTitle(this.searchTerm());
  }
}
