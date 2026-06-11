import { Injectable, signal } from '@angular/core';

@Injectable()
export class DropdownService {
  private _open = signal<boolean>(false);
  public open = this._open.asReadonly();

  public toggle(): void {
    this._open.update((prev) => !prev);
  }
}
