import { TestBed } from '@angular/core/testing';
import type { JamendoResponse, Key, Track } from '../../../models';
import { JamendoService } from '../jamendo.service';
import { vi, it, beforeEach, describe, type MockInstance } from 'vitest';
import { ToastService } from '../../toast/toast.service';
import { JamendoAbstractService } from './jamendo-abstract.service';
import { Injectable, signal, type WritableSignal, type Signal } from '@angular/core';
import { SearchService } from '../../search/search.service';
import { firstValueFrom, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
class TestJamendoService extends JamendoAbstractService<Track> {
  protected override endpoint: Key = 'tracks';
  protected override defaultParams?: Record<string, unknown> | undefined;
}

type jamendoServiceMockT = {
  getWithHttpClient: MockInstance<JamendoService['getWithHttpClient']>;
};

type toastServiceMockT = {
  error: MockInstance<ToastService['error']>;
};

type searchServiceMockT = {
  searchQuery: WritableSignal<string>;
  search: Signal<string>;
};

describe('JamendoAbstractService', () => {
  let service: TestJamendoService;
  let _jamendoServiceMock: jamendoServiceMockT;
  let _toastServiceMock: toastServiceMockT;
  let _searchServiceMock: searchServiceMockT;
  let _signal: WritableSignal<string>;

  const createTrack = (overrides: Partial<Track> = {}): Track => ({
    id: '2',
    name: 'Test track',
    duration: 180,
    releasedate: '2026-02-02',
    position: 1,
    audio: 'audio.mp3',
    image: 'image.jpg',
    artist_id: 'artist-1',
    artist_name: 'Artist',
    album_id: 'album-1',
    album_name: 'Album',
    ...overrides,
  });

  const response: JamendoResponse<Track[]> = {
    headers: {
      status: 'success',
      code: 0,
      error_message: '',
      warnings: '',
      results_count: 1,
    },
    results: [
      createTrack({
        id: '1',
        name: 'Complex',
      }),
    ],
  };

  beforeEach(() => {
    _signal = signal('');

    _jamendoServiceMock = {
      getWithHttpClient: vi.fn(),
    };

    _toastServiceMock = {
      error: vi.fn(),
    };

    _searchServiceMock = {
      searchQuery: _signal,
      search: _signal.asReadonly(),
    };

    TestBed.configureTestingModule({
      providers: [
        TestJamendoService,
        { provide: JamendoService, useValue: _jamendoServiceMock },
        { provide: ToastService, useValue: _toastServiceMock },
        { provide: SearchService, useValue: _searchServiceMock },
      ],
    });
    service = TestBed.inject(TestJamendoService);
  });

  it('should load data$', async () => {
    _jamendoServiceMock.getWithHttpClient.mockReturnValue(of(response));

    const data = await firstValueFrom(service.data$);

    expect(data).toEqual(response.results);
    expect(_jamendoServiceMock.getWithHttpClient).toHaveBeenCalledWith(
      'tracks',
      {
        limit: 30,
      },
      'tracks',
    );
  });

  it('should add search param when search query is not empty', async () => {
    _jamendoServiceMock.getWithHttpClient.mockReturnValue(of(response));

    _searchServiceMock.searchQuery.set('complex');

    const data = await firstValueFrom(service.data$);

    expect(data).toEqual(response.results);

    expect(_jamendoServiceMock.getWithHttpClient).toHaveBeenCalledWith(
      'tracks',
      {
        limit: 30,
        namesearch: 'complex',
      },
      'tracks',
    );
  });

  it('should get data by id with correct params', async () => {
    _jamendoServiceMock.getWithHttpClient.mockReturnValue(of(response));

    const data = await firstValueFrom(service.getDataById('1'));

    expect(data).toEqual(response.results[0]);

    expect(_jamendoServiceMock.getWithHttpClient).toHaveBeenCalledWith(
      'tracks/tracks',
      { limit: 1, id: '1' },
      'tracks',
    );
  });

  it('should handle error when getting data by id', () => {
    const mockError = new HttpErrorResponse({
      error: 'Not Found',
      status: 404,
      statusText: 'Not Found',
    });

    _jamendoServiceMock.getWithHttpClient.mockReturnValue(throwError(() => mockError));

    service.getDataById('1').subscribe({
      next: () => {
        throw new Error('Should not emit data');
      },
      complete: () => {
        expect(_toastServiceMock.error).toHaveBeenCalledWith(mockError.message);
      },
    });

    expect(_jamendoServiceMock.getWithHttpClient).toHaveBeenCalledWith(
      'tracks/tracks',
      {
        limit: 1,
        id: '1',
      },
      'tracks',
    );
  });

  it('should handle error data using catchError and show toast', () => {
    const mockError = new HttpErrorResponse({
      error: 'Not Found',
      status: 404,
      statusText: 'Not Found',
    });

    _jamendoServiceMock.getWithHttpClient.mockReturnValue(throwError(() => mockError));

    TestBed.tick();

    service.data$.subscribe({
      next: () => {
        void expect.fail('Should not emit value on error');
      },
      complete: () => {
        expect(_toastServiceMock.error).toHaveBeenCalledWith(mockError.message);
      },
    });
  });
});
