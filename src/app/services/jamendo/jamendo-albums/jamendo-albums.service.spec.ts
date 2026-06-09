import { TestBed } from '@angular/core/testing';

import { JamendoAlbumsService } from './jamendo-albums.service';

describe('JamendoAlbumsService', () => {
  let service: JamendoAlbumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JamendoAlbumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
