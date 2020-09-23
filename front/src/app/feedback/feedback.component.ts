import { FeedbackService } from './../services/feedback.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openFeedbackDialog() {
    this.dialog.open(FeedbackDialog);
  }
}

@Component({
  selector: 'feedback-dialog',
  templateUrl: 'feedback-dialog.html',
})
export class FeedbackDialog {
  feedbackForm: FormGroup;
  isLoading: boolean;

  constructor(
    private feedbackService: FeedbackService,
    public dialogRef: MatDialogRef<FeedbackDialog>
  ) {
    this.feedbackForm = new FormGroup({
      rate: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      arabicName: new FormControl(null, Validators.required),
    });
  }

  onRatingSet(event: number) {
    this.feedbackForm.get('rate').setValue(event);
  }

  sendFeedback() {
    if (this.feedbackForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.feedbackService.sendFeedback(this.feedbackForm.value).subscribe(
      () => {
        this.isLoading = false;
        this.dialogRef.close();
      },
      () => {}
    );
  }
}
