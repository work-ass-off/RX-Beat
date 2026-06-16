import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PlayerStoreService } from '../../../../../services/store/player-store/player-store.service';

@Component({
  selector: 'app-track-preview',
  imports: [],
  templateUrl: './track-preview.component.html',
  styleUrl: './track-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackPreviewComponent {
  private readonly playerStoreService = inject(PlayerStoreService);
  protected readonly track = computed(() => this.playerStoreService.currentTrack());
  protected readonly isTrackExists = computed(() => !!this.track()?.id);
  protected readonly trackImage = computed(() => (this.isTrackExists() ? this.track()?.image : ''));
  protected readonly trackName = computed(() => (this.isTrackExists() ? this.track()?.name : ''));
  protected readonly artistName = computed(() => (this.isTrackExists() ? this.track()?.artist_name : ''));
  protected readonly isLikedTrack = computed(() => this.playerStoreService.isLikedTrack());

  protected toggleLike(): void {
    this.playerStoreService.isLikedTrack.set(!this.playerStoreService.isLikedTrack());
  }
}
