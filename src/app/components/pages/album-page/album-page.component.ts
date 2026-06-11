import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-album-page',
  imports: [],
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumPageComponent {}
