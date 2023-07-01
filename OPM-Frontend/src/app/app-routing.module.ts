import { NgModule } from "@angular/core";
import {  RouterModule } from "@angular/router";

@NgModule({
imports: [RouterModule.forRoot([{ path: 'part_order_client_list', loadChildren: () => import('./components/part-order-client-list/part-order-client-list.module').then(m => m.PartOrderClientListModule) }, { path: 'part_order_commercial_list', loadChildren: () => import('./components/part-order-commercial-list/part-order-commercial-list.module').then(m => m.PartOrderCommercialListModule) } ])],
// imports: [RouterModule.forRoot([ ])],
exports: [RouterModule],})
export class AppRoutingModule {}


// imports: [RouterModule.forRoot([])],
// exports: [RouterModule],