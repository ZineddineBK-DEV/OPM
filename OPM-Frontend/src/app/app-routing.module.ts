import { NgModule } from "@angular/core";
import {  RouterModule } from "@angular/router";

@NgModule({
// imports: [RouterModule.forRoot([{ path: 'usersProfile', loadChildren: () => import('./components/users-profile/users-profile.module').then(m => m.UsersProfileModule) } ])],
imports: [RouterModule.forRoot([ ])],
// imports: [RouterModule.forRoot([ ])],

exports: [RouterModule],})
export class AppRoutingModule {}


// imports: [RouterModule.forRoot([])],
// exports: [RouterModule],