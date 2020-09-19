import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  @Input() images: string[];
  carouselOptions = { items: 1, dots: true, navigation: true };

  constructor() {}

  ngOnInit(): void {}
}
