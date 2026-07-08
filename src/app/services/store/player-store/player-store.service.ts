import { computed, Injectable, signal } from '@angular/core';
import type { Track } from '../../../models/jamendo.model';

export type QueueName = 'popularTracksQueue' | 'albumQueue' | 'artistQueue' | 'playlistQueue' | 'queueOfPlayedTracks';

@Injectable({
  providedIn: 'root',
})
export class PlayerStoreService {
  public isInitialLoading = signal<boolean>(true);
  //Track
  public readonly currentTrack = signal<Track | null>(null);
  public audio = signal<HTMLAudioElement | null>(null);

  //Track state
  public isPlaying = signal(false);
  public isLikedTrack = signal<boolean>(false);

  //Player state
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
  public queueOfPlayedTracks = signal<Track[]>([]);
  public popularTracksQueue = signal<Track[] | null>(null);
  public albumQueue = signal<Track[] | null>(null);
  public artistQueue = signal<Track[] | null>(null);
  public playlistQueue = signal<Track[] | null>(null);

  public activeQueue = signal<QueueName>('queueOfPlayedTracks');

  public currentQueue = computed(() => this.getQueueByName(this.activeQueue()));
  public isQueueOfPlayedTracksSelected = computed(() => this.activeQueue() === 'queueOfPlayedTracks');
  public isAlbumQueueSelected = computed(() => this.activeQueue() === 'albumQueue');
  public isPopularTracksQueueSelected = computed(() => this.activeQueue() === 'popularTracksQueue');
  public isArtistQueueSelected = computed(() => this.activeQueue() === 'artistQueue');
  public isPlaylistQueueSelected = computed(() => this.activeQueue() === 'playlistQueue');
  public currentTrackIndexInQueue = computed(() => {
    const track = this.currentTrack();
    const queue = this.currentQueue();

    if (!track) {
      return -1;
    }

    return queue.findIndex((t) => t.id === track.id);
  });

  public constructor() {
    this.currentTrack.set(this.queueOfPlayedTracks()[0] ?? null);
  }

  private getQueueByName(queueName: QueueName): Track[] {
    if (queueName === 'albumQueue') {
      return this.albumQueue() ?? [];
    }

    if (queueName === 'popularTracksQueue') {
      return this.popularTracksQueue() ?? [];
    }

    if (queueName === 'artistQueue') {
      return this.artistQueue() ?? [];
    }

    if (queueName === 'playlistQueue') {
      return this.playlistQueue() ?? [];
    }

    return this.queueOfPlayedTracks();
  }

  private ensureCurrentTrackFromActiveQueue(): void {
    const queue = this.currentQueue();
    const currentTrack = this.currentTrack();

    if (!queue.length) {
      return;
    }

    if (!currentTrack) {
      this.setTrack(queue[0], { autoplay: false, addToHistory: false });
    }
  }

  public changeQueueSelection(queueName: QueueName): void {
    this.activeQueue.set(queueName);
    this.ensureCurrentTrackFromActiveQueue();
  }

  public setPopularTracksQueue(tracks: Track[], autoSelect = false): void {
    this.popularTracksQueue.set(tracks);

    if (autoSelect) {
      this.activeQueue.set('popularTracksQueue');
    }

    this.ensureCurrentTrackFromActiveQueue();
  }

  public setAlbumQueue(tracks: Track[], autoSelect = false): void {
    this.albumQueue.set(tracks);

    if (autoSelect) {
      this.activeQueue.set('albumQueue');
    }

    this.ensureCurrentTrackFromActiveQueue();
  }

  public setArtistQueue(tracks: Track[], autoSelect = false): void {
    this.artistQueue.set(tracks);

    if (autoSelect) {
      this.activeQueue.set('artistQueue');
    }

    this.ensureCurrentTrackFromActiveQueue();
  }

  public setPlaylistQueue(tracks: Track[], autoSelect = false): void {
    this.playlistQueue.set(tracks);

    if (autoSelect) {
      this.activeQueue.set('playlistQueue');
    }

    this.ensureCurrentTrackFromActiveQueue();
  }

  public setQueueOfPlayedTracks(tracks: Track[], autoSelect = false): void {
    this.queueOfPlayedTracks.set(tracks);

    if (autoSelect) {
      this.activeQueue.set('queueOfPlayedTracks');
    }

    this.ensureCurrentTrackFromActiveQueue();
  }

  protected addTrackToQueue(track: Track): void {
    this.queueOfPlayedTracks.update((queue) => (queue.find((t) => t.id === track.id) ? queue : [track, ...queue]));
  }

  public setPreviousTrackFromQueue(): void {
    this.audio()?.load();
    const index = this.currentTrackIndexInQueue();

    if (index > 0) {
      const previousTrack = this.currentQueue()[index - 1];
      this.setTrack(previousTrack);
    }
  }

  public setNextTrackFromQueue(): void {
    this.audio()?.load();
    const index = this.currentTrackIndexInQueue();
    const queue = this.currentQueue();

    if (index >= 0 && index < queue.length - 1) {
      const nextTrack = queue[index + 1];
      this.setTrack(nextTrack);
    }
  }

  public setTrack(track: Track | null, options?: { autoplay?: boolean; addToHistory?: boolean }): void {
    this.currentTrack.set(track);
    this.resetTrackState();

    if (track) {
      const shouldAddToHistory = options?.addToHistory ?? true;
      const shouldAutoplay = options?.autoplay ?? true;

      if (shouldAddToHistory) {
        this.addTrackToQueue(track);
      }

      this.audio()?.load();

      if (shouldAutoplay) {
        this.isInitialLoading.set(false);
        this.isPlaying.set(true);
      }
    }
  }

  public resetTrackState(): void {
    this.isPlaying.set(false);
    this.trackCurrentTime.set(0);
  }

  public togglePlay(): void {
    //Prevent play after initial loading
    if (this.isInitialLoading()) {
      this.isInitialLoading.set(false);
    }

    if (!this.currentTrack()) {
      return;
    }

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
    this.isPlaying.set(false);
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
