import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderLink } from './header.model';

const HeaderLinks: HeaderLink[] = [
  { name: 'All', link: '/' },
  { name: 'Music', link: '/123' },
  { name: 'Podcasts', link: '/345' },
];

@Component({
  selector: 'header[app-home-header]',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly links = HeaderLinks;
}
