import { computed, Injectable, signal } from '@angular/core';
import type { JamendoTrack } from '../../../models/jamendo.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerStoreService {
  public readonly currentTrack = signal<JamendoTrack | null>(null);
  public audio = signal<HTMLAudioElement | null>(null);
  public isPlaying = signal(false);
  public volume = signal(1);

  public trackDuration = computed(() => this.currentTrack()?.duration || 0);

  public trackCurrentTime = signal<number>(0);

  public trackProgressPresentage = computed(() => {
    const duration = this.trackDuration();
    const currentTime = this.trackCurrentTime();

    if (!duration) {
      return 0;
    }

    return (currentTime / duration) * 100;
  });

  public setVolume(value: string): void {
    const volume = Number(value);
    const audioElementRef = this.audio();

    if (!audioElementRef) {
      return;
    }

    const normalizedVolume = Math.max(0, Math.min(1, volume));
    audioElementRef.volume = normalizedVolume;
    this.volume.set(normalizedVolume);
  }

  public togglePlay(): void {
    this.isPlaying.set(!this.isPlaying());

    const audioElementRef = this.audio();

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
    const audioElement = this.audio();

    if (!audioElement) {
      return;
    }

    if (!audioElement.duration || Number.isNaN(audioElement.duration)) {
      this.resetTrackTiming();
      return;
    }

    this.trackCurrentTime.set(audioElement.currentTime);

    if (audioElement.currentTime >= audioElement.duration) {
      this.isPlaying.set(false);
      this.trackCurrentTime.set(0);
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
      this.resetTrackTiming();
      return;
    }

    audioElement.currentTime = (newTime / 100) * audioElement.duration;
    this.trackCurrentTime.set(audioElement.currentTime);
  }

  public setTrack(track: JamendoTrack): void {
    this.currentTrack.set(track);
  }

  public resetTrackTiming(): void {
    this.trackCurrentTime.set(0);
  }

  public clearTrack(): void {
    this.currentTrack.set(null);
  }
}
