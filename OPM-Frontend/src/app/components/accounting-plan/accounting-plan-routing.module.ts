import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountingPlanComponent } from './accounting-plan.component';

const routes: Routes = [{ path: '', component: AccountingPlanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingPlanRoutingModule { }
