import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { PlayerStoreService } from '../../../../../../../services/store/player-store/player-store.service';
import { TrackItemComponent } from '../../../../../../shared/track/track-item/track-item.component';

@Component({
  selector: 'app-right-content',
  imports: [TrackItemComponent],
  templateUrl: './right-content.component.html',
  styleUrl: './right-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightContentComponent {
  private playerStoreService = inject(PlayerStoreService);
  protected tracksQueue = computed(() => this.playerStoreService.currentQueue());

  constructor() {
    effect(() => {
      console.log('Current queue in RightContentComponent:', this.tracksQueue());
    });
  }
}
