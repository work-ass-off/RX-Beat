import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';

@Component({
  selector: 'app-tracks-page',
  imports: [ContentComponent],
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TracksPageComponent {}
