import { HttpClient, type HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, tap, type Observable } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

export type AuthDto = {
  login: string;
  password: string;
};

export type User = {
  id: string;
  login: string;
  createdAt: number;
  updatedAt: number;
};

export type Token = {
  access_token: string;
};

@Injectable({
  providedIn: 'root',
})
export class RxBeatApiService {
  private HttpClient = inject(HttpClient);
  private notificationService = inject(NotificationService);
  private localStorage = inject(LocalStorageService);

  private readonly _baseUrl = 'http://localhost:3333/';

  //will be work after deploy
  //private readonly _baseUrl = 'https://rx-beat-api.onrender.com/';

  public signup(data: AuthDto): Observable<Token> {
    return this.HttpClient.post<Token>(`${this._baseUrl}auth/signup`, data).pipe(
      tap((res) => {
        this.localStorage.setItem('token', res.access_token);
        console.log(res.access_token);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.notificationService.show(err.error?.message || 'User already exists');
        } else if (err.status === 400) {
          this.notificationService.show(err.error?.message || 'Bad request');
        } else {
          this.notificationService.show(err.error?.message || 'Something went wrong');
        }
        return EMPTY;
      }),
    );
  }

  public login(data: AuthDto): Observable<Token> {
    return this.HttpClient.post<Token>(`${this._baseUrl}auth/login`, data).pipe(
      tap((res) => {
        this.localStorage.setItem('token', res.access_token);
        console.log(res.access_token);
        console.log(this.localStorage.getItem('token'));
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.notificationService.show(err.error?.message || 'Bad request');
        } else {
          this.notificationService.show(err.error?.message || 'Something went wrong');
        }
        return EMPTY;
      }),
    );
  }
}
