import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketDetailsAdminComponent } from './ticket-details-admin.component';

const routes: Routes = [{ path: '', component: TicketDetailsAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketDetailsAdminRoutingModule { }
