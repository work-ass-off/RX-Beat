import { computed, Injectable, type Signal, signal } from '@angular/core';
import type { Key } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loaders = signal<Record<Key, number>>({
    tracks: 0,
    artists: 0,
    albums: 0,
  });

  public isLoaderActive(type: Key): Signal<boolean> {
    return computed(() => (this._loaders()[type] ?? 0) > 0);
  }

  public show(type: Key): void {
    this._loaders.update((state) => ({
      ...state,
      [type]: (state[type] ?? 0) + 1,
    }));
  }

  public hide(type: Key): void {
    this._loaders.update((state) => ({
      ...state,
      [type]: Math.max(0, (state[type] ?? 0) - 1),
    }));
  }
}
