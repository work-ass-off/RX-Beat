import { TestBed } from '@angular/core/testing';
import type { CanActivateChildFn } from '@angular/router';

import { userGuard } from './user.guard';

describe('userGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => userGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
