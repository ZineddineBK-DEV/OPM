import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestDaliRoutingModule } from './test-dali-routing.module';
import { TestDaliComponent } from './test-dali.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [TestDaliComponent],
  imports: [
    CommonModule,
    TestDaliRoutingModule,
    NgModule,
    NgxPaginationModule
  ]
})
export class TestDaliModule { }
