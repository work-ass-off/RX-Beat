import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import type { Album } from '../../music-collection.mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-preview',
  imports: [],
  templateUrl: './album-preview.component.html',
  styleUrl: './album-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'album-preview', '(click)': 'navigateToAlbum()' },
})
export class AlbumPreviewComponent {
  private router = inject(Router);
  readonly album = input.required<Album>();

  navigateToAlbum() {
    const link = this.router.parseUrl(this.router.url).root.children['primary']?.segments[1]?.path;
    const albumSlug = this.toSlug(this.album().title);

    this.router.navigate(['/home', link, albumSlug]);
  }

  private toSlug(value: string): string {
    return value.toLowerCase().trim().split(' ').join('-');
  }
}
