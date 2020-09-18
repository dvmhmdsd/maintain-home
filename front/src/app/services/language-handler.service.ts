import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageHandlerService {
  constructor(
    private translator: TranslateService,
    @Inject(DOCUMENT) private doc
  ) {
    this.changeAppDirection = this.changeAppDirection.bind(this);
    this.changeTranslationLanguage = this.changeTranslationLanguage.bind(this);
    this.setAppLanguageAndDirectionOnLoad = this.setAppLanguageAndDirectionOnLoad.bind(this);
  }

  changeTranslation(key: string) {
    this.changeTranslationLanguage(key);
    this.updateStorageWithLanguageKey(key);
    this.changeAppDirection(key === 'en' ? 'ltr' : 'rtl');
  }

  getLanguageKey() {
    return localStorage.getItem('language');
  }

  private updateStorageWithLanguageKey(langKey: string) {
    localStorage.setItem('language', langKey);
  }

  private changeTranslationLanguage(langKey: string): void {
    this.translator.use(langKey);
  }

  private changeAppDirection(dir: string): void {
    this.doc.dir = dir;
  }

  private getBrowserLanguageKey() {
    return navigator.language || window.navigator['userLanguage'];
  }

  setAppLanguageAndDirectionOnLoad() {
    let userLanguage = this.getLanguageKey();
    let browserLanguage = this.getBrowserLanguageKey();
    if (userLanguage) {
      if (userLanguage === 'en') {
        this.changeTranslation('en');
      } else {
        this.changeTranslation('ar');
      }
    } else {
      if (browserLanguage === 'en-US') {
        this.changeTranslation('en');
      } else {
        this.changeTranslation('ar');
      }
    }
  }
}
