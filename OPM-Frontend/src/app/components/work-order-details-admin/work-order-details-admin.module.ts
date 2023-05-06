import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrderDetailsAdminRoutingModule } from './work-order-details-admin-routing.module';
import { WorkOrderDetailsAdminComponent } from './work-order-details-admin.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [WorkOrderDetailsAdminComponent],
  imports: [
    CommonModule,
    WorkOrderDetailsAdminRoutingModule,
    NgbModule,
    TranslateModule
  ]
})
export class WorkOrderDetailsAdminModule { }
