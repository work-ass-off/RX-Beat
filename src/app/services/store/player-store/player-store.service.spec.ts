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

  it('isLikedTrack should be false by default', () => {
    expect(service.isLikedTrack()).toBeFalsy();
  });

  it('volume should be 1 by default', () => {
    expect(service.volume()).toBe(1);
  });

  it('trackDuration should be 0 by default', () => {
    expect(service.trackDuration()).toBe(0);
  });

  it('trackProgressPresentage should be 0 by default', () => {
    expect(service.trackProgressPresentage()).toBe(0);
  });

  it('queueOfPlayedTracks should be empty by default', () => {
    expect(service.queueOfPlayedTracks()).toEqual([]);
  });


  it('popularTracksQueue should be null by default', () => {
    expect(service.popularTracksQueue()).toBeNull();
  });

  it('trackCurrentTime should be 0 by default', () => {
    expect(service.trackCurrentTime()).toBe(0);
  });

  it('albumQueue should be null by default', () => {
    expect(service.albumQueue()).toBeNull();
  });

  it('artistQueue should be null by default', () => {
    expect(service.artistQueue()).toBeNull();
  });

  it('playlistQueue should be null by default', () => {
    expect(service.playlistQueue()).toBeNull();
  });

  it('queueOfPlayedTracks should be as active queue by default', () => {
    expect(service.activeQueue()).toBe('queueOfPlayedTracks');
  });

  it('currentQueue should be queueOfPlayedTracks by default', () => {
    expect(service.currentQueue()).toEqual([]);
  });

  it('isQueueOfPlayedTracksSelected should be true by selected', () => {
    service.changeQueueSelection('queueOfPlayedTracks');
    expect(service.isQueueOfPlayedTracksSelected()).toBe(true);
  });

  it('isAlbumQueueSelected should be true by selected', () => {
    service.changeQueueSelection('albumQueue');
    expect(service.isAlbumQueueSelected()).toBe(true);
  });

  it('isPopularTracksQueueSelected should be true by selected', () => {
    service.changeQueueSelection('popularTracksQueue');
    expect(service.isPopularTracksQueueSelected()).toBe(true);
  });

  it('isArtistQueueSelected should be true by selected', () => {
    service.changeQueueSelection('artistQueue');
    expect(service.isArtistQueueSelected()).toBe(true);
  });

  it('isPlaylistQueueSelected should be true by selected', () => {
    service.changeQueueSelection('playlistQueue');
    expect(service.isPlaylistQueueSelected()).toBe(true);
  });

  it('currentTrackIndexInQueue should return -1 when currentTrack is null', () => {
    const track = service.currentTrack();
    const queue = service.currentQueue();
    expect(track).toBeNull();
    expect(queue).toEqual([]);
    expect(service.currentTrackIndexInQueue()).toBe(-1);
  });

  it('currentTrackIndexInQueue should return 0 when currentTrack is the first track in the queue', () => {
    const track = createTrack('track-1');
    service.setTrack(track);
    expect(service.currentTrackIndexInQueue()).toBe(0);
  });

  it('getQueueByName should return the correct queue based on the queue name', () => {
    const track = createTrack('track-1');
    service.setTrack(track);

    // Test the private method getQueueByName using bracket notation
    expect(service['getQueueByName']('queueOfPlayedTracks')).toEqual([track]);
    expect(service['getQueueByName']('albumQueue')).toEqual([]);
    expect(service['getQueueByName']('popularTracksQueue')).toEqual([]);
    expect(service['getQueueByName']('artistQueue')).toEqual([]);
    expect(service['getQueueByName']('playlistQueue')).toEqual([]);
  });

  

  it('trackProgressPresentage should be 50 when trackCurrentTime is half of trackDuration', () => {
    const track = createTrack('track-1');
    service.setTrack(track);
    service.trackCurrentTime.set(track.duration / 2);

    expect(service.trackProgressPresentage()).toBe(50);
  });

  it('setTrack should set currentTrack', () => {
    const track = createTrack('track-1');

    service.setTrack(track);

    expect(service.currentTrack()).toEqual(track);
  });

  it('resetTrackState should reset track state', () => {
    const track = createTrack('track-1');
    service.setTrack(track);
  
    service.trackCurrentTime.set(track.duration);

    service.resetTrackState();

    expect(service.isPlaying()).toBe(false);
    expect(service.trackCurrentTime()).toBe(0);
  });

  it('setTrack should enable playback by default', () => {
    const track = createTrack('track-1');

    service.setTrack(track);

    expect(service.isInitialLoading()).toBe(false);
    expect(service.isPlaying()).toBe(true);
  });

  it('setTrack should not enable playback when autoplay is false', () => {
    const track = createTrack('track-1');

    service.setTrack(track, { autoplay: false });

    expect(service.currentTrack()).toEqual(track);
    expect(service.isInitialLoading()).toBe(true);
    expect(service.isPlaying()).toBe(false);
  });

  it('addTrackToQueue should add track to queueOfPlayedTracks', () => {
    const track = createTrack('track-1');
    service.setTrack(track);
    expect(service.queueOfPlayedTracks()).toContain(track);

    const track2 = createTrack('track-2');
    service.setTrack(track2);
    expect(service.queueOfPlayedTracks()).toEqual([track2, track]);
  });

  it('changeQueueSelection should change the active queue', () => {
    service.changeQueueSelection('popularTracksQueue');
    expect(service.activeQueue()).toBe('popularTracksQueue');

    service.changeQueueSelection('albumQueue');
    expect(service.activeQueue()).toBe('albumQueue');

    service.changeQueueSelection('artistQueue');
    expect(service.activeQueue()).toBe('artistQueue');

    service.changeQueueSelection('playlistQueue');
    expect(service.activeQueue()).toBe('playlistQueue');

    service.changeQueueSelection('queueOfPlayedTracks');
    expect(service.activeQueue()).toBe('queueOfPlayedTracks');
  });

});
