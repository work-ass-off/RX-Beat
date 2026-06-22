import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Track } from '../../../models';
import { TrackTimePipe } from '../../../pipes/track-time/track-time.pipe';

@Component({
  selector: 'app-track',
  imports: [TrackTimePipe],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackComponent {
  public track = input.required<Track>();
}
