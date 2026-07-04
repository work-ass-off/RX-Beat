import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlaylistMenuComponent } from '../../shared/playlist-menu/playlist-menu.component';
import { NewPlaylistBtnComponent } from '../../shared/new-playlist-btn/new-playlist-btn.component';

@Component({
  selector: 'app-profile-page',
  imports: [PlaylistMenuComponent, NewPlaylistBtnComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page' },
})
export class ProfilePageComponent {}
