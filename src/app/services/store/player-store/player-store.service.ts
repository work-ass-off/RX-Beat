import { Injectable, signal } from '@angular/core';
import type { Track } from '../../../models/';

@Injectable({
  providedIn: 'root',
})
export class PlayerStoreService {
  public readonly currentTrack = signal<Track | null>(null);

  public setTrack(track: Track): void {
    this.currentTrack.set(track);
    console.log(track);
  }

  public clearTrack(): void {
    this.currentTrack.set(null);
    console.log('clear');
  }
}
