import { TestBed } from '@angular/core/testing';

import { DropdownService } from './dropdown.service';

describe('DropdownService', () => {
  let service: DropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DropdownService }],
    });
    service = TestBed.inject(DropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be closed by default', () => {
    expect(service.open()).toBe(false);
  });

  it('should toggle dropdown state', () => {
    service.toggle();

    expect(service.open()).toBe(true);

    service.toggle();

    expect(service.open()).toBe(false);
  });
});
