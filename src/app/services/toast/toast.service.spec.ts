import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  const mockTimestamp = 1700000000000;
  const mockNextTimestamp = mockTimestamp + 500;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);

    vi.useFakeTimers();
    vi.setSystemTime(mockTimestamp);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a success toast and return its id', () => {
    const id = service.success('The operation was successful');

    expect(id).toBe(mockTimestamp);
    expect(service.toasts()).toEqual([
      {
        id: mockTimestamp,
        title: 'Success',
        message: 'The operation was successful',
        type: 'success',
      },
    ]);
  });

  it('should add a error toast and return its id', () => {
    const id = service.error('Something went wrong');

    expect(id).toBe(mockTimestamp);
    expect(service.toasts()).toEqual([
      {
        id: mockTimestamp,
        title: 'Error',
        message: 'Something went wrong',
        type: 'error',
      },
    ]);
  });

  it('should add a warning toast and return its id', () => {
    const id = service.warning('System Warning');

    expect(id).toBe(mockTimestamp);
    expect(service.toasts()).toEqual([
      {
        id: mockTimestamp,
        title: 'Warning',
        message: 'System Warning',
        type: 'warning',
      },
    ]);
  });

  it('should add a info toast and return its id', () => {
    const id = service.info('Useful information');

    expect(id).toBe(mockTimestamp);
    expect(service.toasts()).toEqual([
      {
        id: mockTimestamp,
        title: 'Info',
        message: 'Useful information',
        type: 'info',
      },
    ]);
  });

  it('should auto-remove toast after 3000ms', () => {
    service.success('Success toast');

    vi.advanceTimersByTime(500);
    vi.setSystemTime(mockNextTimestamp);
    const id_error = service.error('Error toast');

    expect(service.toasts().length).toBe(2);

    vi.advanceTimersToNextTimer();
    expect(id_error).toBe(mockNextTimestamp);
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].id).toEqual(id_error);
  });

  it('should remove toast manual', () => {
    const id_success = service.success('Success toast');

    vi.setSystemTime(mockNextTimestamp);
    const id_error = service.error('Error toast');

    service.remove(id_success);
    expect(service.toasts().length).toBe(1);
    expect(id_error).toBe(mockNextTimestamp);
    expect(service.toasts()[0].id).toBe(id_error);
  });
});
