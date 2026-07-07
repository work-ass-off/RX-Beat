import { TestBed } from '@angular/core/testing';

import { PlayerStoreService } from './player-store.service';

describe('PlayerStoreService', () => {
  let service: PlayerStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isInitialLoading should be true by default', () => {
    expect(service.isInitialLoading()).toBeTruthy()
  })

  it('currentTrack should be null by default', () => {
    expect(service.currentTrack()).toBeNull()
  })

  it('audio should be null by default', () => {
    expect(service.audio()).toBeNull()
  });

  it('isPlaying should be false by default', () => {
    expect(service.isPlaying()).toBeFalsy()
  });

  it('isLidkedTrack should be false by default', () => {
    expect(service.isLikedTrack()).toBeFalsy()
  })

  it('volume should be 1 by default', () => {
    expect(service.volume()).toBe(1)
  })

  it('trackCurrentTime should be 0 by default', () => {
    expect(service.trackCurrentTime()).toBe(0)
  });

  it('queueOfPlayedTracks should be empty by default', () => {
    expect(service.queueOfPlayedTracks()).toEqual([] )
  });

  it('queueOfPlayedTracks should be as active queue by default', () => {
    expect(service.activeQueue()).toBe('queueOfPlayedTracks')
  });
});
