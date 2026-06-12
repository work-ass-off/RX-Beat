import { Injectable, signal } from '@angular/core';
import type { JamendoTrack } from '../../../models/jamendo.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerStoreService {
  public readonly currentTrack = signal<JamendoTrack | null>(null);
  public audio = signal<HTMLAudioElement | null>(null);
  public isPlaying = signal(false);
  public currentTrackCurrentTime$ = new BehaviorSubject<number>(0);

  public togglePlay(): void {
    this.isPlaying.set(!this.isPlaying());

    const audioElementRef = this.audio();
    console.log(audioElementRef?.currentTime);

    if (!audioElementRef) {
      this.isPlaying.set(false);
      return;
    }

    if (this.isPlaying()) {
      void audioElementRef.play().catch(() => {
        this.isPlaying.set(false);
      });
    } else {
      audioElementRef.pause();
    }
  }

  public updateProgress(): void {
    const audioElementRef = this.audio();

    if (!audioElementRef) {
      this.currentTrackCurrentTime$.next(0);
      return;
    }

    const audioElement = audioElementRef;

    if (!audioElement.duration || Number.isNaN(audioElement.duration)) {
      this.currentTrackCurrentTime$.next(0);
      return;
    }

    this.currentTrackCurrentTime$.next((audioElement.currentTime / audioElement.duration) * 100);

    if (audioElement.currentTime === audioElement.duration) {
      this.isPlaying.set(false);
      this.currentTrackCurrentTime$.next(0);
    }
  }

  public onSliderChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newTime = Number(input.value);
    const audioElementRef = this.audio();

    if (!audioElementRef) {
      return;
    }

    const audioElement = audioElementRef;
    if (!audioElement.duration || Number.isNaN(audioElement.duration)) {
      this.currentTrackCurrentTime$.next(0);
      return;
    }

    audioElement.currentTime = (newTime / 100) * audioElement.duration;
    this.currentTrackCurrentTime$.next(newTime);
  }

  public setTrack(track: JamendoTrack): void {
    this.currentTrack.set(track);
  }

  public clearTrack(): void {
    this.currentTrack.set(null);
  }
}
