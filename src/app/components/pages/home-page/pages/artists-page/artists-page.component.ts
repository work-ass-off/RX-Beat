import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';

@Component({
  selector: 'app-artists-page',
  imports: [ContentComponent],
  templateUrl: './artists-page.component.html',
  styleUrl: './artists-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistsPageComponent {}
