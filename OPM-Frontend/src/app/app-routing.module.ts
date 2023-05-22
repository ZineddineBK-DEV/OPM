import { NgModule } from "@angular/core";
import {  RouterModule } from "@angular/router";

@NgModule({
imports: [RouterModule.forRoot([{ path: 'WODT', loadChildren: () => import('./components/wodt/wodt.module').then(m => m.WODTModule) }, { path: 'workordersdetailsadmin', loadChildren: () => import('./components/workordersdetailsadmin/workordersdetailsadmin.module').then(m => m.WorkordersdetailsadminModule) }])],
exports: [RouterModule],})
export class AppRoutingModule {}


// imports: [RouterModule.forRoot([])],
// exports: [RouterModule],