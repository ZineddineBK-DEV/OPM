import { NgModule } from "@angular/core";
import {  RouterModule } from "@angular/router";

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'companies', loadChildren: () => import('./components/companies/companies.module').then(m => m.CompaniesModule) }, { path: 'foldres', loadChildren: () => import('./components/foldres/foldres.module').then(m => m.FoldresModule) }, { path: 'dashAdminClintStat', loadChildren: () => import('./components/dash-admin-clint-stat/dash-admin-clint-stat.module').then(m => m.DashAdminClintStatModule) }, { path: 'ticketDetailsAdmin', loadChildren: () => import('./components/ticket-details-admin/ticket-details-admin.module').then(m => m.TicketDetailsAdminModule) }, { path: 'filesDetailsAdmin', loadChildren: () => import('./components/files-details-admin/files-details-admin.module').then(m => m.FilesDetailsAdminModule) }, { path: 'workOrderDetailsAdmin', loadChildren: () => import('./components/work-order-details-admin/work-order-details-admin.module').then(m => m.WorkOrderDetailsAdminModule) }])],
  exports: [RouterModule],
})
export class AppRoutingModule {}
