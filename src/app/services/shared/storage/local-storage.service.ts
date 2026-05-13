import { Injectable } from '@angular/core';
import { StorageService } from './abstract/storage.service.abstract';

type LocalStorageState = {
  theme: '';
};

@Injectable({
  providedIn: 'root',
  useFactory: () => new LocalStorageService(localStorage, 'guide'),
})
export class LocalStorageService extends StorageService<LocalStorageState> {}
