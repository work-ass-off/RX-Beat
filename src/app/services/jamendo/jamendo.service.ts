import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { type Observable } from 'rxjs';
import { LOADER_TYPE } from '../loading/loading.context';

@Injectable({
  providedIn: 'root',
})
export class JamendoService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://api.jamendo.com/v3.0';

  private readonly clientId = environment.jamendoClientId;

  private buildParams(params?: Record<string, unknown>): HttpParams {
    let httpParams = new HttpParams().set('client_id', this.clientId).set('format', 'json');

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v !== undefined && v !== null) {
              httpParams = httpParams.append(key, String(v));
            }
          });
          return;
        }

        httpParams = httpParams.set(key, String(value));
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
