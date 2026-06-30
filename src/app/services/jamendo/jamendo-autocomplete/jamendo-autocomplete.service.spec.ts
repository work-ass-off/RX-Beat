import { TestBed } from '@angular/core/testing';

import { JamendoAutocompleteService } from './jamendo-autocomplete.service';

describe('JamendoAutocompleteService', () => {
  let service: JamendoAutocompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JamendoAutocompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
