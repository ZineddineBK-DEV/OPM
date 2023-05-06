import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketDetailsAdminRoutingModule } from './ticket-details-admin-routing.module';
import { TicketDetailsAdminComponent } from './ticket-details-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [TicketDetailsAdminComponent],
  imports: [
    CommonModule,
    TicketDetailsAdminRoutingModule,
    NgbModule,
    TranslateModule
  ]
})
export class TicketDetailsAdminModule { }
