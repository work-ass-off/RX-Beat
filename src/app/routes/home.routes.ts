import { type Routes } from '@angular/router';
import { LeftContentComponent } from '../components/pages/home-page/components/side/left-side-content/left-content/left-content.component';
import { LeftHeaderComponent } from '../components/pages/home-page/components/side/left-side-content/left-header/left-header.component';
import { HomeLayoutComponent } from '../components/pages/home-page/pages/home-layout/home-layout.component';
import { TracksPageComponent } from '../components/pages/home-page/pages/tracks-page/tracks-page.component';
import { userGuard } from '../guards/user/user.guard';
import { JamendoAbstractService } from '../services/jamendo/jamendo-abstract/jamendo-abstract.service';
import { JamendoAlbumsService } from '../services/jamendo/jamendo-albums/jamendo-albums.service';
import { JamendoArtistsService } from '../services/jamendo/jamendo-artists/jamendo-artists.service';
import { JamendoTracksService } from '../services/jamendo/jamendo-tracks/jamendo-tracks.service';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    outlet: 'sidebarHeader',
    component: LeftHeaderComponent,
  },
  {
    path: '',
    outlet: 'sidebarBody',
    component: LeftContentComponent,
  },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'tracks',
        pathMatch: 'full',
      },
      {
        path: 'tracks',
        component: TracksPageComponent,
        providers: [
          {
            provide: JamendoAbstractService,
            useExisting: JamendoTracksService,
          },
        ],
      },
      {
        path: 'albums',
        loadComponent: () =>
          import('../components/pages/home-page/pages/albums-page/albums-page.component').then(
            (m) => m.AlbumsPageComponent,
          ),
        providers: [
          {
            provide: JamendoAbstractService,
            useExisting: JamendoAlbumsService,
          },
        ],
        canActivateChild: [userGuard],
        children: [
          {
            path: ':id',
            loadComponent: () =>
              import('../components/pages/home-page/pages/tracks-page/tracks-page.component').then(
                (m) => m.TracksPageComponent,
              ),
          },
        ],
      },
      {
        path: 'artists',
        loadComponent: () =>
          import('../components/pages/home-page/pages/artists-page/artists-page.component').then(
            (m) => m.ArtistsPageComponent,
          ),
        canActivateChild: [userGuard],
        providers: [
          {
            provide: JamendoAbstractService,
            useExisting: JamendoArtistsService,
          },
        ],
        children: [
          {
            path: ':id',
            loadComponent: () =>
              import('../components/pages/home-page/pages/tracks-page/tracks-page.component').then(
                (m) => m.TracksPageComponent,
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'playlists',
    loadComponent: () =>
      import('../components/pages/home-page/pages/playlists-page/playlists-page.component').then(
        (m) => m.PlaylistsPageComponent,
      ),
    canActivateChild: [userGuard],
    children: [
      {
        path: ':playlistId',
        loadComponent: () =>
          import('../components/pages/home-page/pages/tracks-page/tracks-page.component').then(
            (m) => m.TracksPageComponent,
          ),
      },
    ],
  },
];
