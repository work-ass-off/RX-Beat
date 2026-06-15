import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PlayerStoreService } from '../../../../../services/store/player-store/player-store.service';
import { DEFAULT_VALUE, MAX_VALUE, MIN_VALUE, STEP_CHANGE_VALUE } from './progress-bar.const';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  public readonly trackStoreService = inject(PlayerStoreService);
  public readonly min = MIN_VALUE;
  public readonly max = MAX_VALUE;
  public readonly step = STEP_CHANGE_VALUE;
  public readonly defaultValue = DEFAULT_VALUE;

  public onSliderChange(event: Event): void {
    this.trackStoreService.onSliderChange(event);
  }
}
