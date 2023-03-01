import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdservComponent } from './prodserv.component';

const routes: Routes = [{ path: '', component: ProdservComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdservRoutingModule { }
