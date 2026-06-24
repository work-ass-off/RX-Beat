import { computed, Injectable, signal } from '@angular/core';
import type { Track } from '../../../models/jamendo.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerStoreService {
  //Track
  public readonly currentTrack = signal<Track | null>(null);
  public audio = signal<HTMLAudioElement | null>(null);

  //Track state
  public isPlaying = signal(false);
  public isLikedTrack = signal<boolean>(false);

  public volume = signal(1);

  //Track calculations
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

  //Player queue
  // Transit to the store
  public queue = signal<Track[]>([]);
  public currentTrackIndexInQueue = computed(() => {
    const track = this.currentTrack();
    const queue = this.queue();

    if (!track) {
      return -1;
    }

    return queue.findIndex((t) => t.id === track.id);
  });

  public setPreviousTrackFromQueue(): void {
    this.audio()?.load();
    const index = this.currentTrackIndexInQueue();

    if (index > 0) {
      const previousTrack = this.queue()[index - 1];
      this.setTrack(previousTrack);
      this.isPlaying.set(true);
    }
  }

  public setNextTrackFromQueue(): void {
    this.audio()?.load();
    const index = this.currentTrackIndexInQueue();
    const queue = this.queue();

    if (index >= 0 && index < queue.length - 1) {
      const nextTrack = queue[index + 1];
      this.setTrack(nextTrack);
      this.isPlaying.set(true);
    }
  }

  public setTrack(track: Track): void {
    this.currentTrack.set(track);
    this.queue.update((queue) => (queue.find((t) => t.id === track.id) ? queue : [track, ...queue]));
  }

  public resetTrackState(): void {
    this.isPlaying.set(false);
    this.trackCurrentTime.set(0);
  }

  public togglePlay(): void {
    const shouldPlay = !this.isPlaying();
    this.isPlaying.set(shouldPlay);

    if (!shouldPlay) {
      this.audio()?.pause();
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
      this.resetTrackState();
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

  public resetTrackTiming(): void {
    this.trackCurrentTime.set(0);
  }

  public clearTrack(): void {
    this.currentTrack.set(null);
  }

  public isCurrentTrackChosen(track: Track): boolean {
    const currentTrack = this.currentTrack();
    return currentTrack?.id === track.id;
  }

  public isCurrentTrackPlaying(track: Track): boolean {
    const currentTrack = this.currentTrack();
    return currentTrack?.id === track.id && this.isPlaying();
  }
}
