import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartOrderClientListRoutingModule } from './part-order-client-list-routing.module';
import { PartOrderClientListComponent } from './part-order-client-list.component';


@NgModule({
  declarations: [PartOrderClientListComponent],
  imports: [
    CommonModule,
    PartOrderClientListRoutingModule
  ]
})
export class PartOrderClientListModule { }
