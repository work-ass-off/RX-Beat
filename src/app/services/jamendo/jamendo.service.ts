import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { type Observable } from 'rxjs';
import { LOADER_TYPE } from '../loading/loading.context';

@Injectable({
  providedIn: 'root',
})
export class JamendoService {
  // * ADD HTTP CLIENT
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://api.jamendo.com/v3.0';

  private readonly clientId = environment.jamendoClientId;

  private buildUrl(endpoint: string, params?: Record<string, unknown>): string {
    const searchParams = new URLSearchParams({
      client_id: this.clientId,
      format: 'json',
    });

    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, String(value));
      }
    });

    return `${this.baseUrl}/${endpoint}?${searchParams}`;
  }

  public async get<T>(endpoint: string, params?: Record<string, unknown>, signal?: AbortSignal): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, params), {
      signal,
    });

    if (!response.ok) {
      throw new Error(`Jamendo API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  // * NEW IMPLEMINTATION WITH HTTP CLIENT

  private buildParams(params?: Record<string, unknown>): HttpParams {
    let httpParams = new HttpParams().set('client_id', this.clientId).set('format', 'json');

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }

    return httpParams;
  }

  public getWithHttpClient<T>(endpoint: string, params?: Record<string, unknown>, contextData?: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;

    const httpParams = this.buildParams(params);

    return this.http.get<T>(url, {
      params: httpParams,
      context: contextData ? new HttpContext().set(LOADER_TYPE, contextData) : undefined,
    });
  }
}
