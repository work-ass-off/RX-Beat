import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

export type Theme = 'dark' | 'light';

export const DEFAULT_THEME = 'dark';
export const THEME_KEY = 'theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private localStorage = inject(LocalStorageService);
  private document = inject(DOCUMENT);

  readonly theme = signal<Theme>(this.localStorage.getItem(THEME_KEY, DEFAULT_THEME));

  constructor() {
    effect(() => {
      const currentTheme = this.theme();

      this.localStorage.setItem(THEME_KEY, currentTheme);

      this.document.documentElement.setAttribute('data-theme', currentTheme);
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }
}
