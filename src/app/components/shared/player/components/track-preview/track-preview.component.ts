import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PlayerStoreService } from '../../../../../services/store/player-store/player-store.service';
import { PlaylistMenuComponent } from '../../../playlist-menu/playlist-menu.component';

@Component({
  selector: 'app-track-preview',
  imports: [PlaylistMenuComponent],
  templateUrl: './track-preview.component.html',
  styleUrl: './track-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackPreviewComponent {
  private readonly playerStoreService = inject(PlayerStoreService);
  protected readonly track = computed(() => this.playerStoreService.currentTrack());
}
