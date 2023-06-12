import { NgModule } from "@angular/core";
import {  RouterModule } from "@angular/router";

@NgModule({
imports: [RouterModule.forRoot([{ path: 'UnhandledWorkOrdersDetailAdmin', loadChildren: () => import('./components/unhandled-work-orders-detail-admin/unhandled-work-orders-detail-admin.module').then(m => m.UnhandledWorkOrdersDetailAdminModule) }, { path: 'dashClientJob', loadChildren: () => import('./components/dash-client-job/dash-client-job.module').then(m => m.DashClientJobModule) } ])],
// imports: [RouterModule.forRoot([ ])],
exports: [RouterModule],})
export class AppRoutingModule {}


// imports: [RouterModule.forRoot([])],
// exports: [RouterModule],