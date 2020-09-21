import { TranslateService } from '@ngx-translate/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IFeedback } from './../../../../../CONSTANTS/interfaces/feedback.interface';
import { LanguageHandlerService } from './../../services/language-handler.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() feedbacks: IFeedback[];
  currentLanguage: string;
  carouselOptions: any;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private languageService: LanguageHandlerService,
    private translate: TranslateService
  ) {
    this.currentLanguage = languageService.getLanguageKey();
    this.translate.onLangChange.subscribe(
      (event) => (this.currentLanguage = event.lang)
    );

    this.mobileQuery = media.matchMedia('(max-width: 700px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.carouselOptions = {
      items: this.mobileQuery.matches ? 1 : 3,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3800,
      autoplayHoverPause: false,
      loop: true,
    };
  }

  ngOnInit(): void {}
}
