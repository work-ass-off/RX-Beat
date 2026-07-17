import type { ApplicationConfig } from '@angular/core';
import { isDevMode, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AlbumsEffects } from './store/albums/album.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducer } from './store/app.state';
import { ArtistsEffects } from './store/artists/artist.effects';
import { TracksEffects } from './store/track/track.effects';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideTranslateService({
      fallbackLang: 'en',
      lang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
    }),
    provideRouter(
      routes,
      withRouterConfig({
        canceledNavigationResolution: 'computed',
      }),
      withPreloading(PreloadAllModules),
    ),
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
    provideStore(appReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([AlbumsEffects, ArtistsEffects, TracksEffects]),
    provideAnimations(),
  ],
};
