import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';

@Component({
  selector: 'app-music-page',
  imports: [ContentComponent],
  templateUrl: './music-page.component.html',
  styleUrl: './music-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicPageComponent {}
