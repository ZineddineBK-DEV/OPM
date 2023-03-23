import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [

      {
        path: "**",
       component:SigninComponent,
       canActivate:[AuthGuard]
      },
      {
        path: "signup",
        component:SignupComponent,
        canActivate:[AuthGuard]

      },

      // {
      //   path: "redirection",
      //   component:RedirectionComponent
      // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[AuthGuard],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
