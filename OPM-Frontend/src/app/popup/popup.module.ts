import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostComponent } from './post/post.component';
import { PutComponent } from './put/put.component';
import { DetailsComponent } from './details/details.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    PostComponent,
    PutComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  entryComponents : [
    PostComponent,
    PutComponent,
    DetailsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],

})
export class PopupModule { }
