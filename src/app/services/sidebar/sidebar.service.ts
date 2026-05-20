import { Injectable, signal } from '@angular/core';

@Injectable()
export class SidebarService {
  private readonly _collapse = signal(false);
  readonly isCollapsed = this._collapse.asReadonly();

  toggle() {
    this._collapse.update((val) => !val);
    console.log('click');
  }
}
