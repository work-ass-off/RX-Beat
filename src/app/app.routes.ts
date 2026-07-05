import { type Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { loginGuard } from './guards/login/login.guard';
import { HOME_ROUTES } from './routes/home.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    children: HOME_ROUTES,
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
    path: '**',
    component: NotFoundPageComponent,
  },
];
