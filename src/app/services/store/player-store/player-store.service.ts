import { Injectable, signal } from '@angular/core';
import type { JamendoTrack } from '../../../models/jamendo.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerStoreService {
  readonly currentTrack = signal<JamendoTrack | null>(null);

  setTrack(track: JamendoTrack): void {
    this.currentTrack.set(track);
    console.log(track);
  }

  clearTrack(): void {
    this.currentTrack.set(null);
    console.log('clear');
  }
}
