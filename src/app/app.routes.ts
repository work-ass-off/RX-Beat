import { type Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { loginGuard } from './guards/login/login.guard';
import { userGuard } from './guards/user/user.guard';
import { JamendoAbstractService } from './services/jamendo/jamendo-abstract/jamendo-abstract.service';
import { JamendoTracksService } from './services/jamendo/jamendo-tracks/jamendo-tracks.service';
import { JamendoAlbumsService } from './services/jamendo/jamendo-albums/jamendo-albums.service';
import { JamendoArtistsService } from './services/jamendo/jamendo-artists/jamendo-artists.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: '',
        outlet: 'sidebarHeader',
        loadComponent: () =>
          import('./components/pages/home-page/components/side/left-side-content/left-header/left-header.component').then(
            (m) => m.LeftHeaderComponent,
          ),
      },
      {
        path: '',
        outlet: 'sidebarBody',
        loadComponent: () =>
          import('./components/pages/home-page/components/side/left-side-content/left-content/left-content.component').then(
            (m) => m.LeftContentComponent,
          ),
      },
      {
        path: '',
        loadComponent: () =>
          import('./components/pages/home-page/pages/home-layout/home-layout.component').then(
            (m) => m.HomeLayoutComponent,
          ),
        children: [
          {
            path: '',
            redirectTo: 'tracks',
            pathMatch: 'full',
          },
          {
            path: 'tracks',
            loadComponent: () =>
              import(`./components/pages/home-page/pages/tracks-page/tracks-page.component`).then(
                (m) => m.TracksPageComponent,
              ),
            providers: [
              {
                provide: JamendoAbstractService,
                useClass: JamendoTracksService,
              },
            ],
          },
          {
            path: 'albums',
            loadComponent: () =>
              import('./components/pages/home-page/pages/albums-page/albums-page.component').then(
                (m) => m.AlbumsPageComponent,
              ),
            providers: [
              {
                provide: JamendoAbstractService,
                useClass: JamendoAlbumsService,
              },
            ],
            canActivateChild: [userGuard],
            children: [
              {
                path: ':id',
                loadComponent: () =>
                  import('./components/pages/home-page/pages/tracks-page/tracks-page.component').then(
                    (m) => m.TracksPageComponent,
                  ),
                providers: [
                  {
                    provide: JamendoAbstractService,
                    useClass: JamendoAlbumsService,
                  },
                ],
              },
            ],
          },
          {
            path: 'artists',
            loadComponent: () =>
              import('./components/pages/home-page/pages/artists-page/artists-page.component').then(
                (m) => m.ArtistsPageComponent,
              ),
            canActivateChild: [userGuard],
            providers: [
              {
                provide: JamendoAbstractService,
                useClass: JamendoArtistsService,
              },
            ],
            children: [
              {
                path: ':id',
                loadComponent: () =>
                  import('./components/pages/home-page/pages/tracks-page/tracks-page.component').then(
                    (m) => m.TracksPageComponent,
                  ),
                providers: [
                  {
                    provide: JamendoAbstractService,
                    useClass: JamendoArtistsService,
                  },
                ],
              },
            ],
          },
          {
            path: 'playlists',
            loadComponent: () =>
              import('./components/pages/home-page/pages/playlists-page/playlists-page.component').then(
                (m) => m.PlaylistsPageComponent,
              ),
            canActivateChild: [userGuard],
            children: [
              {
                path: ':playlistId',
                loadComponent: () =>
                  import('./components/pages/home-page/pages/tracks-page/tracks-page.component').then(
                    (m) => m.TracksPageComponent,
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    canDeactivate: [loginGuard],
    loadComponent: () => import('./components/pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./components/pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
  },
  {
    path: 'signup',
    canDeactivate: [loginGuard],
    loadComponent: () =>
      import('./components/pages/signup-page/signup-page.component').then((m) => m.SignupPageComponent),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./components/pages/search-page/search-page.component').then((m) => m.SearchPageComponent),
    providers: [
      {
        provide: JamendoAbstractService,
        useClass: JamendoTracksService,
      },
    ],
  },
  {
    path: 'api',
    loadComponent: () => import('./components/pages/api-page/api-page.component').then((m) => m.ApiPageComponent),
  },
  {
    path: 'store',
    loadComponent: () => import('./components/pages/store-page/store-page.component').then((m) => m.StorePageComponent),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
