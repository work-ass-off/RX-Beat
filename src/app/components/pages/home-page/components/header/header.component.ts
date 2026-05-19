import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { HeaderLink } from './header.model';

const HeaderLinks: HeaderLink[] = [
  { name: 'All', link: 'all' },
  { name: 'Music', link: 'music' },
  { name: 'Podcasts', link: 'podcasts' },
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
