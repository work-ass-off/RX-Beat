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
      // for possible future use, if we want to pass data to the dialog
      // width: '250px',
      // data: { name: this.name, animal: this.animal },
    });

    dialogRef.closed.subscribe(() => {
      // for possible future use, if we want to handle the result from the dialog
      // this.animal = result;
    });
  }
}
