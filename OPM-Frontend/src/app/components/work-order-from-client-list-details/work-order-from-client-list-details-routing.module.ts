import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkOrderFromClientListDetailsComponent } from './work-order-from-client-list-details.component';

const routes: Routes = [{ path: '', component: WorkOrderFromClientListDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderFromClientListDetailsRoutingModule { }
