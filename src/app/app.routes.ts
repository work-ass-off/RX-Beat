import type { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
// import { guestGuard } from './guards/guest/guest.guard';
import { loginGuard } from './guards/login/login.guard';
import { userGuard } from './guards/user/user.guard';

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
        redirectTo: 'tracks',
        pathMatch: 'full',
      },
      {
        path: 'tracks',
        loadComponent: () =>
          import(`./components/pages/home-page/pages/tracks-page/tracks-page.component`).then(
            (m) => m.TracksPageComponent,
          ),
      },
      {
        path: 'albums',
        loadComponent: () =>
          import('./components/pages/home-page/pages/albums-page/albums-page.component').then(
            (m) => m.AlbumsPageComponent,
          ),
        canActivateChild: [userGuard],
        children: [
          {
            path: ':albumId',
            loadComponent: () =>
              import('./components/pages/home-page/pages/tracks-page/tracks-page.component').then(
                (m) => m.TracksPageComponent,
              ),
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
        children: [
          {
            path: ':artistId',
            loadComponent: () =>
              import('./components/pages/home-page/pages/tracks-page/tracks-page.component').then(
                (m) => m.TracksPageComponent,
              ),
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
  },
  {
    path: 'profile',
    canActivate: [userGuard],
    loadComponent: () =>
      import('./components/pages/profile-page/profile-page.component').then((m) => m.ProfilePageComponent),
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
