import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintsRoutingModule } from './complaints-routing.module';
import { ComplaintsComponent } from './complaints.component';


@NgModule({
  declarations: [ComplaintsComponent],
  imports: [
    CommonModule,
    ComplaintsRoutingModule
  ]
})
export class ComplaintsModule { }
