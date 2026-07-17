import { TestBed } from '@angular/core/testing';

import { JamendoPlaylistService } from './jamendo-playlist.service';

describe('JamendoPlaylistService', () => {
  let service: JamendoPlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JamendoPlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
