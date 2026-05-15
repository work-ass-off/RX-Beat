import { computed, Directive, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appLanguage]',
  standalone: true,
  exportAs: 'language',
  host: {
    '(click)': 'switchLanguage()',
  },
})
export class LanguageDirective {
  private translate = inject(TranslateService);

  private langEvent = toSignal(this.translate.onLangChange);

  public currentLanguage = computed(() => {
    return this.langEvent()?.lang || this.translate.getCurrentLang() || 'en';
  });

  public switchLanguage(): void {
    const nextLang = this.currentLanguage() === 'en' ? 'pl' : 'en';
    this.translate.use(nextLang);
  }
}
