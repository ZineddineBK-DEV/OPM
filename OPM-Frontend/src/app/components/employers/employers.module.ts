import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployersRoutingModule } from './employers-routing.module';
import { EmployersComponent } from './employers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [EmployersComponent],
  imports: [
    CommonModule,
    EmployersRoutingModule,
      NgbModule,
    TranslateModule
  ],  schemas:[NO_ERRORS_SCHEMA]

})
export class EmployersModule { }
