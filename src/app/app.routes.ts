import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/pages/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
