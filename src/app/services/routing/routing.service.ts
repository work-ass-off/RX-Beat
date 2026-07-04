import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import type { Key } from '../../models';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  private _router = inject(Router);

  private initUrlTracing = this._router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event: NavigationEnd): Key => {
      const url = event.urlAfterRedirects;
      const pathType = this.pathType(url);
      return pathType;
    }),
  );

  public path = toSignal(this.initUrlTracing, { initialValue: 'tracks' });

  private pathType(url: string): Key {
    if (url.includes('home/tracks')) return 'tracks';
    if (url.includes('home/artists')) return 'artists';
    if (url.includes('home/albums')) return 'albums';
    return 'tracks';
  }
}
