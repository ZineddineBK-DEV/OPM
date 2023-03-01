import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    // TranslateModule
    // ,TranslateModule.forRoot({
    //   loader:{
    //     provide:TranslateLoader,
    //     useFactory:HttpLoaderFactory,
    //     deps:[HttpClient]
    //   }
    // })
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ComponentsModule { }
