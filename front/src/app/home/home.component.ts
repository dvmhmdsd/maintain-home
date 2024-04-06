import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { FeedbacksService } from '../services/feedbacks.service';
import { IFeedback } from '../../../../CONSTANTS/interfaces/feedback.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  images: string[];
  video: string;
  feedbacks: IFeedback[];
  failMessage: string;

  constructor(
    private settingsService: SettingsService,
    private feedbacksService: FeedbacksService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.settingsService.getImages().subscribe(
      (res: any) => {
        this.images = res ? res.images.map((image: any) => image.url) : [];
        this.settingsService.getVideo().subscribe((res: any) => {
          this.video = !!res && res.videoUrl;
        });
      },
      () => {
        this.failMessage = this.translate.instant('data_error')
      }
    );

    this.feedbacksService.getFeedbacks().subscribe(
      (res: any) => {
        this.feedbacks = res.records;
      },
      () => {
        this.feedbacks = null;
      }
    );
  }
}
