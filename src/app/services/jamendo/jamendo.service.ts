import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JamendoService {
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

  async get<T>(endpoint: string, params?: Record<string, unknown>, signal?: AbortSignal): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, params), {
      signal,
    });

    if (!response.ok) {
      throw new Error(`Jamendo API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}
