import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrderFromClientListDetailsRoutingModule } from './work-order-from-client-list-details-routing.module';
import { WorkOrderFromClientListDetailsComponent } from './work-order-from-client-list-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WorkOrderFromClientListDetailsComponent],
  imports: [
    CommonModule,
    WorkOrderFromClientListDetailsRoutingModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule,
    TranslateModule,
    NgxPaginationModule
  ]
})
export class WorkOrderFromClientListDetailsModule { }
