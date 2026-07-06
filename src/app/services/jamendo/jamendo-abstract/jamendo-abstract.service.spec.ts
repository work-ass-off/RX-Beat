import { TestBed } from '@angular/core/testing';

import { JamendoAbstractService } from './jamendo-abstract.service';

describe('JamendoAbstractService', () => {
  let service: JamendoAbstractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JamendoAbstractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
