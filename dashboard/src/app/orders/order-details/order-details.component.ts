import { IOrder } from './../../../../../CONSTANTS/interfaces/order.interface';
import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderStatuses } from '../../../../../CONSTANTS/enums/order-statuses.enum';
import { EditOrderVM } from 'src/app/viewmodels/edit-order.viewmodel';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  loading: boolean;
  order: IOrder;
  selectedStatus = OrderStatuses.PENDING;
  orderStatuses = OrderStatuses;

  constructor(
    private router: ActivatedRoute,
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      let orderId = params.id;
      this.getOrder(orderId);
    });
  }

  getOrder(id: string) {
    this.loading = true;
    this.orderService.getOrderById(id).subscribe(
      (res: IOrder) => {
        this.loading = false;
        this.order = res;
        this.selectedStatus = res.status;
      },
      () => {
        this.loading = false;
        alert(
          'حدث خطأ أثناء جلب بيانات أمر الشغل، من فضلك قم بإعادة تحميل الصفحة أو قم بالتواصل مع الدعم'
        );
      }
    );
  }

  statusChanged(event) {
    let editOrderVM = new EditOrderVM();
    editOrderVM.status = event.value;

    this.selectedStatus = event.value;
    this.orderService.updateOrder(this.order._id, editOrderVM).subscribe(
      (res) => {},
      (err) => {
        this.selectedStatus = this.orderStatuses.PENDING;
        alert(
          'حدث خطأ أثناء تحديث حالة الأمر، من فضلك حاول مرة أخري أو قم بالتواصل مع الدعم'
        );
      }
    );
  }
}
