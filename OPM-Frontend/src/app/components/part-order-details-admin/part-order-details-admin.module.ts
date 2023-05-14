import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartOrderDetailsAdminRoutingModule } from './part-order-details-admin-routing.module';
import { PartOrderDetailsAdminComponent } from './part-order-details-admin.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [PartOrderDetailsAdminComponent],
  imports: [
    CommonModule,
    PartOrderDetailsAdminRoutingModule,
    NgbModule,
    TranslateModule
  ]
})
export class PartOrderDetailsAdminModule { }
