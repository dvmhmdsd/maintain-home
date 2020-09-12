import { Component, OnInit } from '@angular/core';
import { LookupsService } from './../services/lookups.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ordersCount: number;
  complaintsCount: number;
  constructor(private lookups: LookupsService) {}

  ngOnInit(): void {
    this.lookups.get().subscribe(
      (res: any) => {
        this.ordersCount = res.orders;
        this.complaintsCount = res.complaints;
      },
      () => {
        alert('حدث خطأ أثناء جلب البيانات، حاول مرة أخري');
      }
    );
  }
}
