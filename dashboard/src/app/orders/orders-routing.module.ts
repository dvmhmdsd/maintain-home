import { CreateDevicesComponent } from './create-devices/create-devices.component';
import { DevicesComponent } from './devices/devices.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: ':id', component: OrderDetailsComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'create-device', component: CreateDevicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
