import { Component, inject } from '@angular/core';
import { App } from '../../../app';

@Component({
  selector: 'header[app-header]',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: { class: 'section' },
})
export class HeaderComponent {
  private app = inject(App);

  title = this.app.title;
}
