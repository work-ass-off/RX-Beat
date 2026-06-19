import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';

@Component({
  selector: 'app-albums-page',
  imports: [ContentComponent],
  templateUrl: './albums-page.component.html',
  styleUrl: './albums-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsPageComponent {}
