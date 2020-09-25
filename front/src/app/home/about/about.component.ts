import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnDestroy, OnInit {
  @ViewChild('target', { static: true }) target: ElementRef;
  options: {
    controls: boolean;
    sources: {
      src: string;
      type: string;
    }[];
  };
  player: videojs.Player;

  private _videoSrc: string;

  @Input() set videoUrl(value: string) {
    this._videoSrc = value
    if (this._videoSrc) {
      console.log(this._videoSrc)
      this.options = {
        controls: true,
        sources: [{ src: this._videoSrc, type: 'video/mp4' }],
      };
      this.player = videojs(
        this.target.nativeElement,
        this.options,
        function onPlayerReady() {}
      );
      this.target.nativeElement.parentElement.style.display = "flex"
    } else {
      this.target.nativeElement.style.display = "none"
    }
  }

  get videoUrl() {
    return this._videoSrc
  }

  constructor() {}
  ngOnInit(): void {
    if (this._videoSrc) {
      this.options = {
        controls: true,
        sources: [{ src: this._videoSrc, type: 'video/mp4' }],
      };
      this.player = videojs(
        this.target.nativeElement,
        this.options,
        function onPlayerReady() {}
      );
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
