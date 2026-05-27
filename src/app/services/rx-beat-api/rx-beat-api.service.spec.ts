import { TestBed } from '@angular/core/testing';

import { RxBeatApiService } from './rx-beat-api.service';

describe('RxBeatApiService', () => {
  let service: RxBeatApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxBeatApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
