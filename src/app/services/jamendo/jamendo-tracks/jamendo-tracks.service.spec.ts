import { TestBed } from '@angular/core/testing';

import { JamendoTracksService } from './jamendo-tracks.service';

describe('JamendoTracksService', () => {
  let service: JamendoTracksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JamendoTracksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
