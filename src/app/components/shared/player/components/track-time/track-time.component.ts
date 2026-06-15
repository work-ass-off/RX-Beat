import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TrackTimePipe } from '../../../../../pipes/track-time/track-time.pipe';
import { PlayerStoreService } from '../../../../../services/store/player-store/player-store.service';

@Component({
  selector: 'app-track-time',
  imports: [TrackTimePipe],
  templateUrl: './track-time.component.html',
  styleUrl: './track-time.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackTimeComponent {
  public readonly trackStoreService = inject(PlayerStoreService);
  public readonly isTimeIsCurrentTime = input<boolean>(false);

  public readonly timeData = computed(() => {
    const duration = Math.floor(this.trackStoreService.trackDuration());
    const currentTime = Math.floor(this.trackStoreService.trackCurrentTime());
    const reminderTime = Math.max(duration - currentTime, 0);

    return this.isTimeIsCurrentTime() ? currentTime : reminderTime;
  });
}
