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
  isLoading: boolean;
  constructor(private lookups: LookupsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.lookups.get().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.ordersCount = res.orders;
        this.complaintsCount = res.complaints;
      },
      () => {
        alert('حدث خطأ أثناء جلب البيانات، حاول مرة أخري');
      }
    );
  }
}
