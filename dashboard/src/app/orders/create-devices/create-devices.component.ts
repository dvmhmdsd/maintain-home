import { DevicesService } from './../../services/devices.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-devices',
  templateUrl: './create-devices.component.html',
  styleUrls: ['./create-devices.component.scss'],
})
export class CreateDevicesComponent implements OnInit {
  deviceForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateDevicesComponent>,
    private devicesService: DevicesService,
    private router: Router
  ) {
    this.deviceForm = new FormGroup({
      name: new FormControl('', Validators.required),
      arabicName: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  openDialog(msg: string) {
    this.dialog.open(DialogData, {
      data: {
        msg,
      },
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  createDevice() {
    let deviceName = this.deviceForm.get('name').value;
    this.openDialog('يتم إنشاء جهاز الآن ...');
    this.devicesService.createDevice({ name: deviceName }).subscribe(
      () => {
        this.closeDialog();
        this.openDialog('لقد تم إنشاء الجهاز');
        setTimeout(() => {
          this.closeDialog();
          this.deviceForm.reset();
        }, 1000);
      },
      () => {
        this.openDialog('حدث خطأ أثناء ‘نشاء مدير، من فضلك حاول مرة أخري');
      }
    );
  }
}

@Component({
  selector: 'dialog-data',
  templateUrl: './dialog-data.html',
})
export class DialogData {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
