import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-podcasts-page',
  imports: [],
  templateUrl: './podcasts-page.component.html',
  styleUrl: './podcasts-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastsPageComponent {}
