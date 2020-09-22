import { ComplaintVM } from './complaint.viewmodel';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComplaintService } from './../services/complaint.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
})
export class ComplaintsComponent implements OnInit {
  complaintsForm: FormGroup;

  constructor(
    private complaintService: ComplaintService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {
    this.complaintsForm = new FormGroup({
      orderNumber: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  private openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, null, {
      duration,
    });
  }

  closeSnackBar() {
    this._snackBar.dismiss();
  }

  sendComplaint() {
    if (this.complaintsForm.invalid) {
      return;
    }

    let complaintVM = new ComplaintVM();
    complaintVM.orderNumber = this.complaintsForm.get('orderNumber').value;
    complaintVM.body = this.complaintsForm.get('body').value;

    this.openSnackBar(this.translate.instant('wait'), null);
    this.complaintService.sendComplaint(complaintVM).subscribe(
      () => {
        this.closeSnackBar();
        this.openSnackBar(this.translate.instant('complaint_created'), 2000);
        setTimeout(() => {
          this.router.navigate(['/']);
        });
      },
      () => {
        this.closeSnackBar();
        this.openSnackBar(this.translate.instant('complaint_error'), 2000);
      }
    );
  }
}
