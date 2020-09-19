import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  images: string[];
  video: string;
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getImages().subscribe(
      (res: any) => {
        this.images = res.images.map((image: any) => image.url);
        this.settingsService.getVideo().subscribe((res: any) => {
          this.video = res.videoUrl;
          console.log(this.video)
        });
      },
      () => {
        window.location.reload();
      }
    );
  }
}
