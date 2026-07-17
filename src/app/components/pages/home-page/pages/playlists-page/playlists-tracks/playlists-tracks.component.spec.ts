import type { ComponentFixture } from '@angular/core/testing';
import { signal, computed, type Signal } from '@angular/core';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { PlaylistsTracksComponent } from './playlists-tracks.component';
import { JamendoPlaylistService } from '../../../../../../services/jamendo/jamendo-playlist/jamendo-playlist.service';
import { LoadingService } from '../../../../../../services/loading/loading.service';
import { PlayerStoreService } from '../../../../../../services/store/player-store/player-store.service';

const loadingSignal = signal<boolean>(false);
const mockLoadingService = {
  isLoaderActive: (): Signal<boolean> => computed(() => loadingSignal()),
};

describe('PlaylistsTracksComponent', () => {
  let component: PlaylistsTracksComponent;
  let fixture: ComponentFixture<PlaylistsTracksComponent>;
  const routeData = signal<string[]>([]);

  const mockTracks = [
    {
      id: '1',
      name: 'Track 1',
      duration: 120,
      releasedate: '2026-01-01',
      position: 1,
      audio: 'a',
      image: 'i',
      artist_id: 'ar1',
      artist_name: 'Artist',
      album_id: 'al1',
      album_name: 'Album',
    },
  ];

  const mockJamendoService = {
    getPlaylistTracks: vi.fn(() => of(mockTracks)),
  };

  const mockPlayerStoreService = {
    setPlaylistQueue: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    routeData.set([]);
    loadingSignal.set(false);

    mockJamendoService.getPlaylistTracks.mockReturnValue(of(mockTracks));

    await TestBed.configureTestingModule({
      imports: [PlaylistsTracksComponent],
      providers: [
        {
          provide: ROUTER_OUTLET_DATA,
          useValue: routeData,
        },
        {
          provide: JamendoPlaylistService,
          useValue: mockJamendoService,
        },
        {
          provide: LoadingService,
          useValue: mockLoadingService,
        },
        {
          provide: PlayerStoreService,
          useValue: mockPlayerStoreService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistsTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should contain "Tracks Page"', () => {
    const element = fixture.nativeElement;
    const title = element.querySelector('p');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Tracks Page');
  });

  it('should have a loading spinner', () => {
    loadingSignal.set(true);
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const spinner = element.querySelector('app-loader-spinner');

    expect(spinner).toBeTruthy();
  });

  it('should hide spinner when loading is false', () => {
    loadingSignal.set(false);
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const spinner = element.querySelector('app-loader-spinner');

    expect(spinner).toBeNull();
  });

  it('playlist tracks should be fetched and set in the player store', async () => {
    const ids = ['1', '2', '3'];
    routeData.set(ids);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockJamendoService.getPlaylistTracks).toHaveBeenCalledWith(ids);
    expect(mockPlayerStoreService.setPlaylistQueue).toHaveBeenCalledWith(mockTracks, true);
  });
});
