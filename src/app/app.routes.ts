import type { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

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
        redirectTo: 'all',
        pathMatch: 'full',
      },
      {
        path: 'all',
        loadComponent: () => import('./components/pages/all-page/all-page.component').then((m) => m.AllPageComponent),
      },
      {
        path: 'music',
        loadComponent: () =>
          import('./components/pages/music-page/music-page.component').then((m) => m.MusicPageComponent),
      },
      {
        path: 'podcasts',
        loadComponent: () =>
          import('./components/pages/podcasts-page/podcasts-page.component').then((m) => m.PodcastsPageComponent),
      },
    ],
  },

  {
    path: 'login',
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
