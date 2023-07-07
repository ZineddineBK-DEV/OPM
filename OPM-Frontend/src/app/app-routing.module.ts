import { NgModule } from "@angular/core";
import {  RouterModule } from "@angular/router";

@NgModule({
imports: [RouterModule.forRoot([{ path: 'test_dali', loadChildren: () => import('./components/test-dali/test-dali.module').then(m => m.TestDaliModule) } ])],
exports: [RouterModule],})
export class AppRoutingModule {}


// imports: [RouterModule.forRoot([])],
// exports: [RouterModule],