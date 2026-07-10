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

  it('trackProgressPresentage should be 50 when trackCurrentTime is half of trackDuration', () => {
    const track = createTrack('track-1');
    service.setTrack(track);
    service.trackCurrentTime.set(track.duration / 2);

    expect(service.trackProgressPresentage()).toBe(50);
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

  it('setPopularTracksQueue should set popularTracksQueue', () => {
    const tracks = [createTrack('tracks-1'), createTrack('track-2')];
    service.setPopularTracksQueue(tracks);
    expect(service.popularTracksQueue()).toEqual(tracks);
  });

  it('setPopularTracksQueue should set popularTracksQueue if autoSelect is true', () => {
    const tracks = [createTrack('tracks-1'), createTrack('track-2')];
    service.setPopularTracksQueue(tracks, true);
    expect(service.popularTracksQueue()).toEqual(tracks);
    expect(service.activeQueue()).toBe('popularTracksQueue');
  });

  it('setAlbumQueue should set albumQueue', () => {
    const tracks = [createTrack('tracks-1'), createTrack('track-2')];
    service.setAlbumQueue(tracks);
    expect(service.albumQueue()).toEqual(tracks);
  });

  it('setAlbumQueue should set albumQueue if autoSelect is true', () => {
    const tracks = [createTrack('tracks-1'), createTrack('track-2')];
    service.setAlbumQueue(tracks, true);
    expect(service.albumQueue()).toEqual(tracks);
    expect(service.activeQueue()).toBe('albumQueue');
  });

  it('setArtistQueue should set artistQueue', () => {
    const tracks = [createTrack('tracks-1'), createTrack('track-2')];
    service.setArtistQueue(tracks);
    expect(service.artistQueue()).toEqual(tracks);
  });

  it('setArtistQueue should set artistQueue if autoSelect is true', () => {
    const tracks = [createTrack('tracks-1'), createTrack('track-2')];
    service.setArtistQueue(tracks, true);
    expect(service.artistQueue()).toEqual(tracks);
    expect(service.activeQueue()).toBe('artistQueue');
  });

  it('setPlaylistQueue should set playlistQueue', () => {
    const tracks = [createTrack('tracks-1'), createTrack('track-2')];
    service.setPlaylistQueue(tracks);
    expect(service.playlistQueue()).toEqual(tracks);
  });

  it('setPlaylistQueue should set playlistQueue if autoSelect is true', () => {
    const tracks = [createTrack('tracks-1'), createTrack('track-2')];
    service.setPlaylistQueue(tracks, true);
    expect(service.playlistQueue()).toEqual(tracks);
    expect(service.activeQueue()).toBe('playlistQueue');
  });

  it('setQueueOfPlayedTracks should set queueOfPlayedTracks', () => {
    const tracks = [createTrack('tracks-1'), createTrack('track-2')];
    service.setQueueOfPlayedTracks(tracks);
    expect(service.queueOfPlayedTracks()).toEqual(tracks);
  });

  it('setQueueOfPlayedTracks should set queueOfPlayedTracks if autoSelect is true', () => {
    const tracks = [createTrack('tracks-1'), createTrack('track-2')];
    service.setQueueOfPlayedTracks(tracks, true);
    expect(service.queueOfPlayedTracks()).toEqual(tracks);
    expect(service.activeQueue()).toBe('queueOfPlayedTracks');
  });

  it('setPreviousTrackFromQueue should set the previous track in the queue as currentTrack', () => {
    const track1 = createTrack('track-1');
    const track2 = createTrack('track-2');
    service.setQueueOfPlayedTracks([track1, track2]);
    service.setTrack(track2);
    service.setPreviousTrackFromQueue();
    expect(service.currentTrack()).toEqual(track1);
  });

  it('setNextTrackFromQueue should set the next track in the queue as currentTrack', () => {
    const track1 = createTrack('track-1');
    const track2 = createTrack('track-2');
    service.setQueueOfPlayedTracks([track1, track2]);
    service.setTrack(track1);
    service.setNextTrackFromQueue();
    expect(service.currentTrack()).toEqual(track2);
  });

  it('setTrack should set currentTrack', () => {
    const track = createTrack('track-1');

    service.setTrack(track);

    expect(service.currentTrack()).toEqual(track);
  });

  it('setTrack should update queueOfPlayedTracks', () => {
    const track = createTrack('track-1');
    service.setTrack(track);
    const track2 = createTrack('track-2');
    service.setTrack(track2);
    expect(service.queueOfPlayedTracks()).toEqual([track2, track]);
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

  it('resetTrackState should reset track state', () => {
    const track = createTrack('track-1');
    service.setTrack(track);

    service.trackCurrentTime.set(track.duration);

    service.resetTrackState();

    expect(service.isPlaying()).toBe(false);
    expect(service.trackCurrentTime()).toBe(0);
  });

  it('togglePlayback should toggle playback state', () => {
    const track = createTrack('track-1');
    service.setTrack(track);

    service.togglePlay();

    expect(service.isPlaying()).toBe(false);

    service.togglePlay();

    expect(service.isPlaying()).toBe(true);
  });

  it.todo('audion should be set when setTrack is called');

  it('clearTrack should remove currentTrack and reset track state', () => {
    const track = createTrack('track-1');
    service.setTrack(track);

    service.clearTrack();

    expect(service.currentTrack()).toBeNull();
    expect(service.isPlaying()).toBe(false);
    expect(service.trackCurrentTime()).toBe(0);
  });

  it('isCurrentTrackInQueue should return true when currentTrack is in the queue', () => {
    const track = createTrack('track-1');
    service.setQueueOfPlayedTracks([track]);
    service.setTrack(track);

    expect(service.isCurrentTrackChosen(track)).toBe(true);
  });

  it('isCurrentTrackInQueue should return false when currentTrack is not in the queue', () => {
    const track1 = createTrack('track-1');
    const track2 = createTrack('track-2');
    service.setQueueOfPlayedTracks([track1]);
    service.setTrack(track1);

    expect(service.isCurrentTrackChosen(track2)).toBe(false);
  });

  it('isCurrentTrackPlaying should return true when currentTrack is playing', () => {
    const track = createTrack('track-1');
    service.setTrack(track);

    expect(service.isCurrentTrackPlaying(track)).toBe(true);
  });

  it('isCurrentTrackPlaying should return false when currentTrack is not playing', () => {
    const track = createTrack('track-1');
    service.setTrack(track, { autoplay: false });

    expect(service.isCurrentTrackPlaying(track)).toBe(false);
  });
});
