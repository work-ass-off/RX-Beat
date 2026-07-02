import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import type { HeaderLink } from './header.model';

const HeaderLinks: HeaderLink[] = [
  { name: 'Tracks', link: 'tracks' },
  { name: 'Albums', link: 'albums' },
  { name: 'Artists', link: 'artists' },
  { name: 'Playlists', link: 'playlists' },
];

@Component({
  selector: 'header[app-home-header]',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public readonly links = HeaderLinks;
}
