import { HttpContextToken } from '@angular/common/http';

export const LOADER_TYPE = new HttpContextToken<string>(() => 'global');
