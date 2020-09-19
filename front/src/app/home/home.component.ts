import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  images: string[];
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getImages().subscribe(
      (res: any) => {
        this.images = res.images.map((image: any) => image.url);
      },
      () => {
        window.location.reload();
      }
    );
  }
}
