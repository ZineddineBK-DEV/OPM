import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestDaliComponent } from './test-dali.component';

const routes: Routes = [{ path: '', component: TestDaliComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestDaliRoutingModule { }
