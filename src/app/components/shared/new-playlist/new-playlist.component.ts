import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RxBeatApiService } from '../../../services/rx-beat-api/rx-beat-api.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-new-playlist',
  imports: [ReactiveFormsModule],
  templateUrl: './new-playlist.component.html',
  styleUrl: './new-playlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlaylistComponent {
  private readonly RxBeatApiService = inject(RxBeatApiService);
  private readonly fb = inject(FormBuilder);
  protected dialogRef = inject<DialogRef<string>>(DialogRef<string>);

  public playlistForm = this.fb.group({
    name: ['', Validators.required],
  });

  public onPlaylistCreate(): void {
    const data = this.playlistForm.value.name ?? '';
    this.RxBeatApiService.createPlaylist({ name: data }).subscribe();
    this.playlistForm.reset();
    this.RxBeatApiService.refreshPlaylists();
    this.dialogRef.close();
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
