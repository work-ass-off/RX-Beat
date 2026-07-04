import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { NewPlaylistComponent } from '../new-playlist/new-playlist.component';

@Component({
  selector: 'app-new-playlist-btn',
  imports: [],
  templateUrl: './new-playlist-btn.component.html',
  styleUrl: './new-playlist-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlaylistBtnComponent {
  private readonly dialog = inject(Dialog);

  public openDialog(): void {
    const dialogRef = this.dialog.open<string>(NewPlaylistComponent, {
      width: '250px',
      // data: { name: this.name, animal: this.animal },
    });

    dialogRef.closed.subscribe(() => {
      // this.animal = result;
    });
  }
}
