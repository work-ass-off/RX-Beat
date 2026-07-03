import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public searchQuery = signal<string>('');
  public readonly search = this.searchQuery.asReadonly();
}
