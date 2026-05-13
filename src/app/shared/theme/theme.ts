import { effect, inject, InjectionToken, signal } from '@angular/core';
import { LocalStorageService } from '../../services/shared/storage/local-storage.service';

export type Theme = 'dark' | 'light';

export const DEFAULT_THEME = 'light';
export const THEME_KEY = 'theme';

export const THEME = new InjectionToken('THEME', {
  providedIn: 'root',
  factory: () => {
    const storage = inject(LocalStorageService);
    const theme = storage.getItem(THEME_KEY, DEFAULT_THEME);
    const themeSignal = signal<Theme>(theme);

    effect(() => {
      storage.setItem(THEME_KEY, themeSignal());
    });

    return Object.assign(themeSignal, {
      toggle: () => {
        themeSignal.update((cur) => (cur === 'dark' ? 'light' : 'dark'));
      },
    });
  },
});
