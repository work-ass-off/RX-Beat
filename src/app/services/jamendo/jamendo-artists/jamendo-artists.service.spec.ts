import { TestBed } from '@angular/core/testing';

import { JamendoArtistsService } from './jamendo-artists.service';

describe('JamendoArtistsService', () => {
  let service: JamendoArtistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JamendoArtistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
