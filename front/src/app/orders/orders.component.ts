import { Router } from '@angular/router';
import { OrdersService } from './../services/orders.service';
import { OrderVM } from './order.viewmodel';
import { LanguageHandlerService } from './../services/language-handler.service';
import { DevicesService } from './../services/devices.service';
import { IDevice } from './../../../../CONSTANTS/interfaces/device.interface';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersFormOne: FormGroup;
  ordersFormTwo: FormGroup;
  gps: { latitude: number; longitude: number };
  devicesList: IDevice[];
  currentLanguage: string;
  isLoading: boolean;
  hint: string;
  otherOptionChosen: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private deviceService: DevicesService,
    private languageService: LanguageHandlerService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.ordersFormOne = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(\s{0,}[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})\s{0,}$/
          ),
        ])
      ),
      phone: new FormControl(null, Validators.required),
      whatsapp: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
    });

    this.ordersFormTwo = new FormGroup({
      device: new FormControl(null, Validators.required),
      paymentType: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      damage: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required),
      hint: new FormControl(null, Validators.required),
      customDevice: new FormControl(null),
    });

    this.currentLanguage = this.languageService.getLanguageKey();
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });

    this.deviceService.getDevices().subscribe((res: IDevice[]) => {
      this.devicesList = res;
      this.devicesList.push({
        _id: "other",
        name: this.translate.instant('other'),
        arabicName: this.translate.instant('other')
      })
      this.isLoading = false
    });
  }

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, null, {
      duration,
    });
  }

  closeSnackBar() {
    this._snackBar.dismiss();
  }

  getUserLocation() {
    this.openSnackBar(this.translate.instant('gps_loading'), null);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.gps = {
          latitude,
          longitude,
        };
        this.closeSnackBar();
      },
      () => this.openSnackBar(this.translate.instant('gps_error'), 2000)
    );
  }

  handelDeviceChange(e: MatSelectChange) {
    if (e.value === 'other') {
      this.otherOptionChosen = true
    } else {
      this.otherOptionChosen = false
    }
  }

  createOrder() {
    if (this.ordersFormOne.invalid || this.ordersFormTwo.invalid) {
      return;
    }
    let order = new OrderVM();
    order.name = this.ordersFormOne.get('name').value;
    order.email = this.ordersFormOne.get('email').value;
    order.phone = this.ordersFormOne.get('phone').value;
    order.whatsapp = this.ordersFormOne.get('whatsapp').value;
    order.location = this.ordersFormOne.get('location').value;
    order.device = this.ordersFormTwo.get('device').value;
    order.customDevice = this.ordersFormTwo.get('customDevice').value;
    order.paymentType = this.ordersFormTwo.get('paymentType').value;
    order.model = this.ordersFormTwo.get('model').value;
    order.damage = this.ordersFormTwo.get('damage').value;
    order.time = this.ordersFormTwo.get('time').value;
    order.gps = this.gps;

    if (this.otherOptionChosen) {
      delete order.device;
    }

    this.openSnackBar(this.translate.instant('order_submitting'), null);
    this.ordersService.createOrder(order).subscribe(
      () => {
        this.closeSnackBar();
        this.openSnackBar(this.translate.instant('order_created'), 2000);
        setTimeout(() => {
          this.router.navigate(['/'])
        })
      },
      () => {
        this.closeSnackBar();
        this.openSnackBar(this.translate.instant('order_error'), 2000);
      }
    );
  }
}
