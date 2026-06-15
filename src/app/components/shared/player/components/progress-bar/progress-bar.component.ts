import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
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
  public readonly value = input<number>(0);
  public readonly isVolumeBar = input<boolean>(false);
  public readonly id = input<string>('');

  public readonly sliderMin = 0;
  public readonly sliderMax = 100;
  public readonly sliderStep = 0.1;
  public readonly volumeMin = 0;
  public readonly volumeMax = 1;
  public readonly volumeStep = 0.01;

  public onSliderChange(event: Event): void {
    this.trackStoreService.onSliderChange(event);
  }

  public setVolume(event: Event): void {
    this.trackStoreService.setVolume((event.target as HTMLInputElement).value);
  }
}
