import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoldresRoutingModule } from './foldres-routing.module';
import { FoldresComponent } from './foldres.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [FoldresComponent],
  imports: [
    CommonModule,
    FoldresRoutingModule,
    NgbModule,
    TranslateModule
  ]
})
export class FoldresModule { }
