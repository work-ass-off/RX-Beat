import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorage = inject(LocalStorageService);
  public readonly isLoggedIn = signal<boolean>(false);

  constructor() {
    this.init();
  }

  public login(token: string): void {
    this.localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
  }

  public logout(): void {
    this.localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }

  public init(): void {
    this.isLoggedIn.set(!!this.localStorage.getItem('token'));
  }
}
