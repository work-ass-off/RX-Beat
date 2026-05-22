import { Injectable, signal } from '@angular/core';
import type { JamendoTrack } from '../../../models/jamendo.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerStoreService {
  public readonly currentTrack = signal<JamendoTrack | null>(null);

  public setTrack(track: JamendoTrack): void {
    this.currentTrack.set(track);
    console.log(track);
  }

  public clearTrack(): void {
    this.currentTrack.set(null);
    console.log('clear');
  }
}
