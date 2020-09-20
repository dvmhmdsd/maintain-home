import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  @Input() images: string[];
  carouselOptions = {
    items: 1,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    loop: true
  };

  constructor() {}

  ngOnInit(): void {}
}
