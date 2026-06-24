import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PlayerStoreService } from '../../../../../services/store/player-store/player-store.service';
import {
  DEFAULT_VALUE,
  MAX_VALUE,
  MIN_VALUE,
  SLIDER_MAX,
  SLIDER_MIN,
  SLIDER_STEP,
  STEP_CHANGE_VALUE,
  VOLUME_MAX,
  VOLUME_MIN,
  VOLUME_STEP,
} from './progress-bar.const';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  public readonly trackStoreService = inject(PlayerStoreService);
  protected readonly min = MIN_VALUE;
  protected readonly max = MAX_VALUE;
  protected readonly step = STEP_CHANGE_VALUE;
  protected readonly defaultValue = DEFAULT_VALUE;
  public readonly value = input<number>(0);
  public readonly isVolumeBar = input<boolean>(false);
  public readonly id = input<string>('');

  public readonly sliderMin = SLIDER_MIN;
  public readonly sliderMax = SLIDER_MAX;
  public readonly sliderStep = SLIDER_STEP;
  public readonly volumeMin = VOLUME_MIN;
  public readonly volumeMax = VOLUME_MAX;
  public readonly volumeStep = VOLUME_STEP;

  public onSliderChange(event: Event): void {
    this.trackStoreService.onSliderChange(event);
  }

  public setVolume(event: Event): void {
    this.trackStoreService.setVolume((event.target as HTMLInputElement).value);
  }
}
