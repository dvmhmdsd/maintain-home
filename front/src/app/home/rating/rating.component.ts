import { LanguageHandlerService } from './../../services/language-handler.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IFeedback } from './../../../../../CONSTANTS/interfaces/feedback.interface';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() feedbacks: IFeedback[];
  @Input() feedbackCounts: {
    5: number;
    4: number;
    3: number;
  };
  currentLanguage: string;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private languageService: LanguageHandlerService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.currentLanguage = languageService.getLanguageKey();

    this.mobileQuery = media.matchMedia('(max-width: 400px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {}
}
