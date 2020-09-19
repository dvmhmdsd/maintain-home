import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { FeedbacksService } from '../services/feedbacks.service';
import { IFeedback } from '../../../../CONSTANTS/interfaces/feedback.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  images: string[];
  video: string;
  feedbacks: IFeedback[];
  feedbacksCounts: {
    5: number;
    4: number;
    3: number;
  };

  constructor(
    private settingsService: SettingsService,
    private feedbacksService: FeedbacksService
  ) {}

  ngOnInit(): void {
    this.settingsService.getImages().subscribe(
      (res: any) => {
        this.images = res.images.map((image: any) => image.url);
        this.settingsService.getVideo().subscribe((res: any) => {
          this.video = res.videoUrl;
        });
      },
      () => {
        window.location.reload();
      }
    );

    this.feedbacksService.getFeedbacks().subscribe(
      (res: any) => {
        this.feedbacks = res.records;
        this.feedbacksCounts = res.counts;
      },
      () => {
        this.feedbacks = null;
      }
    );
  }
}
