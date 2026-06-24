import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';

@Component({
  selector: 'app-playlists-page',
  imports: [ContentComponent],
  templateUrl: './playlists-page.component.html',
  styleUrl: './playlists-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistsPageComponent {}
