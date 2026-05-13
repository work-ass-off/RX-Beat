import { Injectable } from '@angular/core';
import { StorageService } from '../../abstract/storage.service.abstract';
import { type Theme } from '../../../shared/theme/theme';

type LocalStorageState = {
  theme: Theme;
};

@Injectable({
  providedIn: 'root',
  useFactory: () => new LocalStorageService(localStorage, 'guide'),
})
export class LocalStorageService extends StorageService<LocalStorageState> {}
