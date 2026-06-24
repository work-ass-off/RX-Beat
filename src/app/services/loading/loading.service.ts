import { computed, Injectable, type Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loaders = signal<Record<string, number>>({});

  public isLoaderActive(type: string): Signal<boolean> {
    return computed(() => (this._loaders()[type] ?? 0) > 0);
  }

  public show(type: string): void {
    this._loaders.update((state) => ({
      ...state,
      [type]: (state[type] ?? 0) + 1,
    }));
  }

  public hide(type: string): void {
    this._loaders.update((state) => ({
      ...state,
      [type]: Math.max(0, (state[type] ?? 0) - 1),
    }));
  }
}
