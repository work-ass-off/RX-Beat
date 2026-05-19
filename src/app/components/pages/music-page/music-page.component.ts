import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-music-page',
  imports: [],
  templateUrl: './music-page.component.html',
  styleUrl: './music-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicPageComponent {}
