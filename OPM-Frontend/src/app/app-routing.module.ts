import { NgModule } from "@angular/core";
import {  RouterModule } from "@angular/router";

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'companies', loadChildren: () => import('./components/companies/companies.module').then(m => m.CompaniesModule) }])],
  exports: [RouterModule],
})
export class AppRoutingModule {}
