import { Component, OnInit } from '@angular/core';
import { DevicesService } from './../../services/devices.service';
import { IDevice } from './../../../../../CONSTANTS/interfaces/device.interface';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  isLoadingResults = true;
  isFailed: boolean;
  displayedColumns: string[] = ['name', 'arabicName', '_id'];
  data: IDevice[] = [];

  constructor(private devicesService: DevicesService) {}

  ngOnInit(): void {
    this.listDevices();
  }

  listDevices() {
    this.devicesService.getDevices().subscribe(
      (res: IDevice[]) => {
        this.isLoadingResults = false;
        this.data = res;
        this.isFailed = false;
      },
      () => {
        this.isLoadingResults = false;
        this.isFailed = true;
      }
    );
  }

  deleteDevice(deviceId: string) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا الجاهز ؟')) {
      this.devicesService.deleteDevice(deviceId).subscribe(
        () => {
          this.data = this.data.filter((device) => device._id !== deviceId);
        },
        () => {
          alert(
            'حدث خطأ أثناء حذف الجهاز، حاول مرة أخري أو قم بالإتصال بالدعم'
          );
        }
      );
    }
  }
}
