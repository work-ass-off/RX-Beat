import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';

@Component({
  selector: 'app-podcasts-page',
  imports: [ContentComponent],
  templateUrl: './podcasts-page.component.html',
  styleUrl: './podcasts-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastsPageComponent {}
