import { signal } from '@angular/core';
import { TracksPageComponent } from './tracks-page.component';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../../../../services/auth/auth.service';
import { JamendoAbstractService } from '../../../../../services/jamendo/jamendo-abstract/jamendo-abstract.service';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { PlayerStoreService } from '../../../../../services/store/player-store/player-store.service';

describe('TracksPageComponent', () => {
  let fixture: ComponentFixture<TracksPageComponent>;
  let component: TracksPageComponent;

  const jamendoServiceMock = {
    getDataById: vi.fn().mockReturnValue(of({ tracks: [] })),
    data$: of([]),
  };

  const loadingServiceMock = {
    isLoaderActive: vi.fn().mockReturnValue(signal(false)),
  };

  const activatedRouteMock = {
    paramMap: of(convertToParamMap({})),
    snapshot: {
      parent: {
        url: [],
      },
    },
  };

  const playerStoreServiceMock = {
    setAlbumQueue: vi.fn(),
    setArtistQueue: vi.fn(),
    setPlaylistQueue: vi.fn(),
    setPopularTracksQueue: vi.fn(),
  };

  const authServiceMock = {
    isLoggedIn: signal(true),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksPageComponent],
      providers: [
        {
          provide: JamendoAbstractService,
          useValue: jamendoServiceMock,
        },
        {
          provide: LoadingService,
          useValue: loadingServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
        {
          provide: PlayerStoreService,
          useValue: playerStoreServiceMock,
        },
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TracksPageComponent);
    component = fixture.componentInstance;
  });

  it('should create tracks page', () => {
    expect(component).toBeTruthy();
  });

  it('should show auth required message for unauthorized user', () => {
    authServiceMock.isLoggedIn.set(false);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.auth-required')).toBeTruthy();

    expect(compiled.textContent).toContain('Please log in to listen to music.');
  });

  it('should not show auth required message for authorized user', () => {
    authServiceMock.isLoggedIn.set(true);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.auth-required')).toBeNull();
  });

  it('should set popular tracks queue when route has no id', () => {
    fixture.detectChanges();

    expect(playerStoreServiceMock.setPopularTracksQueue).toHaveBeenCalledWith([], true);
  });
});
