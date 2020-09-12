import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintsRoutingModule } from './complaints-routing.module';
import { ComplaintsComponent, DialogData } from './complaints.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ComplaintsComponent, DialogData],
  imports: [
    CommonModule,
    ComplaintsRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
  ],
})
export class ComplaintsModule {}
