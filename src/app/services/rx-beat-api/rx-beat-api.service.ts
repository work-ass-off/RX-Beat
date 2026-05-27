import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { type Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class RxBeatApiService {
  private HttpClient = inject(HttpClient);
  private readonly _baseUrl = 'http://localhost:3333/';

  public signup(data: AuthDto): Observable<User> {
    return this.HttpClient.post<User>(`${this._baseUrl}auth/signup`, data);
  }

  public signin(data: AuthDto): Observable<User> {
    return this.HttpClient.post<User>(`${this._baseUrl}auth/signin`, data);
  }
}
