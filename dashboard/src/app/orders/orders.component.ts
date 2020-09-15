import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EditOrderVM } from './../viewmodels/edit-order.viewmodel';
import { OrdersService } from './../services/orders.service';
import { IOrder } from './../../../../CONSTANTS/interfaces/order.interface';
import { OrderStatuses } from './../../../../CONSTANTS/enums/order-statuses.enum';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  isLoadingResults = true;
  isFailed: boolean;
  displayedColumns: string[] = [
    'orderNumber',
    'name',
    'phone',
    'status',
    'createdAt',
    '_id',
  ];
  data: MatTableDataSource<IOrder>;
  orderStatuses = OrderStatuses;
  loading: boolean;
  selectedStatuses = {};

  constructor(private orderService: OrdersService) {}

  ngAfterViewInit(): void {
    this.listOrders();
  }

  listOrders() {
    this.orderService.getOrders().subscribe(
      (res: IOrder[]) => {
        this.isLoadingResults = false;
        this.data = new MatTableDataSource(res);
        this.isFailed = false;
        this.data.filteredData.forEach(
          (order: IOrder) => (this.selectedStatuses[order._id] = order.status)
        );
      },
      (err) => {
        this.isLoadingResults = false;
        this.isFailed = true;
      }
    );
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  statusChanged(event: any, orderId: string) {
    let editOrderVM = new EditOrderVM();
    editOrderVM.status = event.value;

    this.loading = true;
    this.orderService.updateOrder(orderId, editOrderVM).subscribe(
      (res) => {
        this.selectedStatuses[orderId] = event.value;
      },
      (err) => {
        this.selectedStatuses[orderId] = this.orderStatuses.PENDING;
        alert(
          'حدث خطأ أثناء تحديث حالة الأمر، من فضلك حاول مرة أخري أو قم بالتواصل مع الدعم'
        );
      }
    );
  }
}
