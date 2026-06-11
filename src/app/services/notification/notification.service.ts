import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _notification = signal<string>('');
  public readonly notification = this._notification.asReadonly();

  public show(message: string): void {
    this._notification.set(message);
  }

  public clear(): void {
    this._notification.set('');
  }
}
