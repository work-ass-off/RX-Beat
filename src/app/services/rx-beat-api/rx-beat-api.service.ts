import { HttpClient, type HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, shareReplay, switchMap, tap, type Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import type { AuthDto, Playlist, PlaylistDto, Token, User } from '../../models/';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class RxBeatApiService {
  private HttpClient = inject(HttpClient);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  private readonly _baseUrl = environment.rxBeatUrl;

  public signup(data: AuthDto): Observable<Token> {
    return this.HttpClient.post<Token>(`${this._baseUrl}/auth/signup`, data).pipe(
      tap((res) => {
        this.authService.login(res.access_token);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.toastService.error(err.error?.message || 'User already exists');
        } else if (err.status === 400) {
          this.toastService.error(err.error?.message || 'Bad request');
        } else {
          this.toastService.error(err.error?.message || 'Something went wrong');
        }
        return EMPTY;
      }),
    );
  }

  public login(data: AuthDto): Observable<Token> {
    return this.HttpClient.post<Token>(`${this._baseUrl}/auth/login`, data).pipe(
      tap((res) => {
        this.authService.login(res.access_token);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.toastService.error(err.error?.message || 'Bad request');
        } else {
          this.toastService.error(err.error?.message || 'Something went wrong');
        }
        return EMPTY;
      }),
    );
  }

  public me(): Observable<User> {
    return this.HttpClient.get<User>(`${this._baseUrl}/users/me`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.toastService.error(err.error?.message || 'Unauthorized');
        } else {
          this.toastService.error(err.error?.message || 'Something went wrong');
        }
        return EMPTY;
      }),
    );
  }

  private refreshSubject$ = new BehaviorSubject<void>(undefined);

  public playlists$ = this.refreshSubject$.pipe(
    switchMap(() =>
      this.HttpClient.get<Playlist[]>(`${this._baseUrl}/playlists`).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.toastService.error(err.error?.message || 'Sign in to see your playlists');
          } else {
            this.toastService.error(err.error?.message || 'Something went wrong');
          }
          return EMPTY;
        }),
      ),
    ),
    shareReplay(1),
  );

  public refreshPlaylists(): void {
    this.refreshSubject$.next();
  }

  public createPlaylist(data: PlaylistDto): Observable<Playlist> {
    return this.HttpClient.post<Playlist>(`${this._baseUrl}/playlists`, data).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.toastService.error(err.error?.message || 'You can not create playlist without login');
        } else {
          this.toastService.error(err.error?.message || 'Something went wrong');
        }
        return EMPTY;
      }),
    );
  }

  public getPlaylist(id: string): Observable<Playlist> {
    return this.HttpClient.get<Playlist>(`${this._baseUrl}/playlists/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.toastService.error(err.error?.message || 'You can not get playlist without login');
        } else {
          this.toastService.error(err.error?.message || 'Something went wrong');
        }
        return EMPTY;
      }),
    );
  }

  public deletePlaylist(id: string): Observable<void> {
    return this.HttpClient.delete<void>(`${this._baseUrl}/playlists/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.toastService.error(err.error?.message || 'You can not delete playlist without login');
        } else {
          this.toastService.error(err.error?.message || 'Something went wrong');
        }
        return EMPTY;
      }),
    );
  }
  public updatePlaylist(id: string, data: PlaylistDto): Observable<Playlist> {
    return this.HttpClient.put<Playlist>(`${this._baseUrl}/playlists/${id}`, data).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.toastService.error(err.error?.message || 'You can not update playlist without login');
        } else {
          this.toastService.error(err.error?.message || 'Something went wrong');
        }
        return EMPTY;
      }),
    );
  }

  public addTrackToPlaylist(playlistId: string, trackId: string): Observable<void> {
    return this.HttpClient.post<void>(`${this._baseUrl}/playlists/${playlistId}/tracks`, { trackId: trackId }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.toastService.error(err.error?.message || 'You can not add track to playlist without login');
        } else {
          this.toastService.error(err.error?.message || 'Something went wrong');
        }
        return EMPTY;
      }),
    );
  }

  public removeTrackFromPlaylist(playlistId: string, trackId: string): Observable<void> {
    return this.HttpClient.delete<void>(`${this._baseUrl}/playlists/${playlistId}/tracks/${trackId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.toastService.error(err.error?.message || 'You can not remove track from playlist without login');
        } else {
          this.toastService.error(err.error?.message || 'Something went wrong');
        }
        return EMPTY;
      }),
    );
  }
}
