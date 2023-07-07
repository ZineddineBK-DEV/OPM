import { NgModule } from "@angular/core";
import {  RouterModule } from "@angular/router";

@NgModule({
imports: [RouterModule.forRoot([{ path: 'contract', loadChildren: () => import('./components/contract/contract.module').then(m => m.ContractModule) } ])],
// imports: [RouterModule.forRoot([ ])],
// imports: [RouterModule.forRoot([ ])],
// imports: [RouterModule.forRoot([ ])],

exports: [RouterModule],})
export class AppRoutingModule {}


// imports: [RouterModule.forRoot([])],
// exports: [RouterModule],