import { HttpContextToken } from '@angular/common/http';
import type { Key } from '../../models';

export const LOADER_TYPE = new HttpContextToken<Key>(() => 'tracks');
