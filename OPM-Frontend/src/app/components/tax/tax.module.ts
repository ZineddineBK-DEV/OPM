import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxRoutingModule } from './tax-routing.module';
import { TaxComponent } from './tax.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [TaxComponent],
  imports: [
    CommonModule,
    TaxRoutingModule,
    NgbModule,
    TranslateModule
  ],  schemas:[NO_ERRORS_SCHEMA]

})
export class TaxModule { }
