import { TestBed } from '@angular/core/testing';

import { SidebarService } from './sidebar.service';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SidebarService }],
    });
    service = TestBed.inject(SidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be collapsed by default', () => {
    expect(service.isCollapsed()).toBe(true);
  });

  it('should toggle collapsed state', () => {
    service.toggle();
    expect(service.isCollapsed()).toBe(false);

    service.toggle();
    expect(service.isCollapsed()).toBe(true);
  });
});
