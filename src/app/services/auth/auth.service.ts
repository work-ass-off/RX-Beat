import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorage = inject(LocalStorageService);
  private readonly _isLoggedIn = signal<boolean>(false);
  public toastService = inject(ToastService);
  public readonly isLoggedIn = this._isLoggedIn.asReadonly();

  constructor() {
    this.init();
  }

  public login(token: string): void {
    this.localStorage.setItem('token', token);
    this._isLoggedIn.set(true);
    this.toastService.info('You are login');
  }

  public logout(): void {
    this.localStorage.removeItem('token');
    this._isLoggedIn.set(false);
    this.toastService.info('You are log out');
  }

  public init(): void {
    this._isLoggedIn.set(!!this.localStorage.getItem('token'));
  }
}
