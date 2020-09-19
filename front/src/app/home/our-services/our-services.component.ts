import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
})
export class OurServicesComponent implements OnInit {
  services = [
    { icon: 'done_outline', name: 'honest' },
    { icon: 'stars', name: 'special' },
    { icon: 'payments', name: 'economical' },
    { icon: 'engineering', name: 'staff' },
    { icon: 'construction', name: 'parts' },
    { icon: 'search', name: 'tools' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
