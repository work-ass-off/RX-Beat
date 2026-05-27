import type { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { guestGuard } from './guards/guest/guest.guard';
import { loginGuard } from './guards/login/login.guard';

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
        redirectTo: 'all',
        pathMatch: 'full',
      },
      {
        path: 'all',
        loadComponent: () =>
          import(`./components/pages/home-page/pages/all-page/all-page.component`).then((m) => m.AllPageComponent),
        canActivateChild: [guestGuard],
        children: [
          {
            path: ':albumName',
            loadComponent: () =>
              import('./components/pages/album-page/album-page.component').then((m) => m.AlbumPageComponent),
          },
        ],
      },
      {
        path: 'music',
        loadComponent: () =>
          import('./components/pages/home-page/pages/music-page/music-page.component').then(
            (m) => m.MusicPageComponent,
          ),
        canActivateChild: [guestGuard],
        children: [
          {
            path: ':albumName',
            loadComponent: () =>
              import('./components/pages/album-page/album-page.component').then((m) => m.AlbumPageComponent),
          },
        ],
      },
      {
        path: 'podcasts',
        loadComponent: () =>
          import('./components/pages/home-page/pages/podcasts-page/podcasts-page.component').then(
            (m) => m.PodcastsPageComponent,
          ),
        canActivateChild: [guestGuard],
        children: [
          {
            path: ':albumName',
            loadComponent: () =>
              import('./components/pages/album-page/album-page.component').then((m) => m.AlbumPageComponent),
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
    path: '**',
    loadComponent: () =>
      import('./components/pages/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
