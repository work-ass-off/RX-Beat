import { Injectable, signal } from '@angular/core';

@Injectable()
export class SidebarService {
  private readonly _collapse = signal(false);
  public readonly isCollapsed = this._collapse.asReadonly();

  public toggle(): void {
    this._collapse.update((val) => !val);
  }
}
