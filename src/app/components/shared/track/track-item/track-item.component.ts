import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PlayerStoreService } from '../../../../services/store/player-store/player-store.service';
import type { Track } from '../../../../models';
import { SidebarService } from '../../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-track-item',
  imports: [],
  templateUrl: './track-item.component.html',
  styleUrl: './track-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackItemComponent {
  protected playerStoreService = inject(PlayerStoreService);
  private sidebarService = inject(SidebarService);
  public track = input.required<Track>();

  public readonly isCollapsed = this.sidebarService.isCollapsed;

  public isCurrentTrackPlaying(): boolean {
    return this.playerStoreService.isCurrentTrackPlaying(this.track());
  }

  public togglePlay(): void {
    if (this.playerStoreService.isCurrentTrackChosen(this.track())) {
      this.playerStoreService.togglePlay();
      return;
    }

    this.playerStoreService.setTrack(this.track());
    this.playerStoreService.audio()?.load();
    this.playerStoreService.togglePlay();
    return;
  }
}
