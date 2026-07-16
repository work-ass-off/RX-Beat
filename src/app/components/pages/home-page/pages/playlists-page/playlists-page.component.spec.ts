import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { RxBeatApiService } from '../../../../../services/rx-beat-api/rx-beat-api.service';
import { PlaylistsPageComponent } from './playlists-page.component';

describe('PlaylistsPageComponent', () => {
  let fixture: ComponentFixture<PlaylistsPageComponent>;
  let component: PlaylistsPageComponent;

  const playlist = {
    id: 'playlist-1',
    name: 'My playlist',
    tracks: ['track-1', 'track-2'],
    userId: 'user-1',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const rxBeatApiServiceMock = {
    playlists$: of([]),
  };

  const loadingServiceMock = {
    isLoaderActive: vi.fn().mockReturnValue(signal(false)),
  };

  const routerMock = {
    navigate: vi.fn(),
  };

  const activatedRouteMock = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistsPageComponent],
      providers: [
        {
          provide: RxBeatApiService,
          useValue: rxBeatApiServiceMock,
        },
        {
          provide: LoadingService,
          useValue: loadingServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create playlist page', () => {
    expect(component).toBeTruthy();
  });

  it('should set active tracks and navigate to playlist', () => {
    component.navigateToPlaylist(playlist);

    expect(component.activeTracks()).toEqual(['track-1', 'track-2']);

    expect(routerMock.navigate).toHaveBeenCalledWith(['playlist-1'], {
      relativeTo: activatedRouteMock,
    });
  });

  it('should navigate to playlist', () => {
    component.navigateToPlaylist(playlist);

    expect(routerMock.navigate).toHaveBeenCalled();
  });
});
