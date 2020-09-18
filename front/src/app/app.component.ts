import { LanguageHandlerService } from './services/language-handler.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentLanguage: string;
  routes = [{ path: '/', label: 'home' }];
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private languageService: LanguageHandlerService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.languageService.setAppLanguageAndDirectionOnLoad();
    this.currentLanguage = this.languageService.getLanguageKey();
  }

  toggleLanguage() {
    if (this.currentLanguage === 'en') {
      this.languageService.changeTranslation('ar');
      this.currentLanguage = 'ar';
    } else {
      this.languageService.changeTranslation('en');
      this.currentLanguage = 'en';
    }
  }
}
