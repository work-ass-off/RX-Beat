import { TestBed } from '@angular/core/testing';
import type { Track } from '../../../models/jamendo.model';

import { PlayerStoreService } from './player-store.service';

describe('PlayerStoreService', () => {
  let service: PlayerStoreService;

  //factory function to create a Track object for testing
  const createTrack = (id: string): Track => ({
    id,
    name: `Track ${id}`,
    duration: 180,
    releasedate: '2026-01-01',
    position: 1,
    audio: 'https://example.com/audio.mp3',
    image: 'https://example.com/image.jpg',
    artist_id: 'artist-1',
    artist_name: 'Artist',
    album_id: 'album-1',
    album_name: 'Album1',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isInitialLoading should be true by default', () => {
    expect(service.isInitialLoading()).toBeTruthy();
  });

  it('currentTrack should be null by default', () => {
    expect(service.currentTrack()).toBeNull();
  });

  it('audio should be null by default', () => {
    expect(service.audio()).toBeNull();
  });

  it('isPlaying should be false by default', () => {
    expect(service.isPlaying()).toBeFalsy();
  });

  it('isLidkedTrack should be false by default', () => {
    expect(service.isLikedTrack()).toBeFalsy();
  });

  it('volume should be 1 by default', () => {
    expect(service.volume()).toBe(1);
  });

  it('trackCurrentTime should be 0 by default', () => {
    expect(service.trackCurrentTime()).toBe(0);
  });

  it('queueOfPlayedTracks should be empty by default', () => {
    expect(service.queueOfPlayedTracks()).toEqual([]);
  });

  it('queueOfPlayedTracks should be as active queue by default', () => {
    expect(service.activeQueue()).toBe('queueOfPlayedTracks');
  });

  it('setTrack is set track current track', () => {
    const track = createTrack('track-1');

    service.setTrack(track);
    expect(service.currentTrack()).toEqual(track);
  });

  it('resetTrackState should reset track state', () => {
    service.isPlaying.set(true);
    service.trackCurrentTime.set(100);

    service.resetTrackState();

    expect(service.isPlaying()).toBe(false);
    expect(service.trackCurrentTime()).toBe(0);
  });

  it('togglePlay should turn on pause for initial loading', () => {
    service.isInitialLoading.set(true);

    expect(service.isInitialLoading()).toBe(true);
    expect(service.isPlaying()).toBe(false);
  });
  // it('changeQueueSelection should change active queue', () => {
  //   service.changeQueueSelection('albumQueue');

  //   expect(service.activeQueue()).toBe('albumQueue');
  // });

  // it('changeQueueSelection should set first track from selected queue when currentTrack is null', () => {
  //   const albumTrack = createTrack('track-1');
  //   service.setAlbumQueue([albumTrack]);

  //   service.changeQueueSelection('albumQueue');

  //   expect(service.activeQueue()).toBe('albumQueue');
  //   expect(service.currentTrack()).toEqual(albumTrack);
  //   expect(service.queueOfPlayedTracks()).toEqual([]);
  // });

  // it('changeQueueSelection should not replace existing currentTrack', () => {
  //   const currentTrack = createTrack('track-current');
  //   const albumTrack = createTrack('track-album');
  //   service.setTrack(currentTrack, { autoplay: false });
  //   service.setAlbumQueue([albumTrack]);

  //   service.changeQueueSelection('albumQueue');

  //   expect(service.currentTrack()).toEqual(currentTrack);
  // });
});
