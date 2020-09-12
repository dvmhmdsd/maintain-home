import { ComplaintService } from './../services/complaint.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IComplaint } from './../../../../CONSTANTS/interfaces/complaint.interface';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
  isLoadingResults = true;
  isFailed: boolean;
  displayedColumns: string[] = ['orderNumber', '_id'];
  data: IComplaint[] = [];

  constructor(
    public dialog: MatDialog,
    private complaintsService: ComplaintService
  ) { }

  ngOnInit(): void {
    this.listComplaints();
  }

  listComplaints() {
    this.complaintsService.getComplaints().subscribe(
      (res: IComplaint[]) => {
        this.isLoadingResults = false;
        this.data = res;
        this.isFailed = false;
      },
      (err) => {
        this.isLoadingResults = false;
        this.isFailed = true;
      }
    );
  }


  openDialog(complaint: IComplaint) {
    this.dialog.open(DialogData, {
      data: {
        complaint
      },
    });
  }
}



@Component({
  selector: 'dialog-dats',
  templateUrl: './dialog-data.html',
})
export class DialogData {
  complaint: IComplaint

  constructor(
    @Inject(MAT_DIALOG_DATA) public data?: any,
  ) {}
}
