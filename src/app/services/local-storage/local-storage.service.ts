import { Injectable } from '@angular/core';
import { StorageService } from '../abstract/storage.service.abstract';

export type LocalStorageState = {
  theme: 'light' | 'dark';
  user?: {
    id: string;
    name: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends StorageService<LocalStorageState> {
  constructor() {
    super(localStorage, 'rxbeat');
  }
}
