import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdservRoutingModule } from './prodserv-routing.module';
import { ProdservComponent } from './prodserv.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ProdservComponent],
  imports: [
    CommonModule,
    ProdservRoutingModule ,
    NgbModule,
    TranslateModule
  ],
  schemas:[NO_ERRORS_SCHEMA]
})


export class ProdservModule { }
