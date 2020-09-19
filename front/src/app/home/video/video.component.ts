import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target: ElementRef;
  @Input() videoUrl: string;
  options: {
    controls: boolean;
    sources: {
      src: string;
      type: string;
    }[];
  };
  player: videojs.Player;

  constructor() {}

  ngOnInit(): void {
    console.log(this.videoUrl)
    this.options = {
      controls: true,
      sources: [{ src: this.videoUrl, type: 'video/mp4' }],
    };
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
