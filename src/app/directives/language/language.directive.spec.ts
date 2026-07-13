import { LanguageDirective } from './language.directive';
import { TranslateService, type LangChangeEvent } from '@ngx-translate/core';
import type { MockInstance } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

type TranslateServiceMockT = {
  onLangChange: Subject<LangChangeEvent>;
  getCurrentLang: MockInstance<TranslateService['getCurrentLang']>;
  use: MockInstance<TranslateService['use']>;
};

describe('LanguageDirective', () => {
  let _translateServiceMock: TranslateServiceMockT;
  let _languageDirective: LanguageDirective;

  beforeEach(() => {
    _translateServiceMock = {
      onLangChange: new Subject<LangChangeEvent>(),
      getCurrentLang: vi.fn().mockReturnValue('en'),
      use: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [LanguageDirective, { provide: TranslateService, useValue: _translateServiceMock }],
    });

    _languageDirective = TestBed.runInInjectionContext(() => new LanguageDirective());
  });

  it('should create an instance', () => {
    expect(_languageDirective).toBeTruthy();
  });

  it('should current en default language', () => {
    expect(_languageDirective.currentLanguage()).toBe('en');
  });

  it('should call translate with "pl" when current language is "en"', () => {
    _languageDirective.switchLanguage();
    expect(_translateServiceMock.use).toHaveBeenCalledWith('pl');
  });
});
