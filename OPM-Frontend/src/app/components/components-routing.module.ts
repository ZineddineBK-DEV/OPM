import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { LayoutComponent } from "../layout/original-layout/layout.component";
import { NotfoundComponent } from "../pages/notfound/notfound.component";



const routes: Routes = [
  {
    path: "app",
    component: LayoutComponent,
    canActivateChild:[AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "accounting/plan",
        loadChildren: () =>
          import("../components/accounting-plan/accounting-plan.module").then(
            (m) => m.AccountingPlanModule
          ),
      },
      {
        path: "employers",
        loadChildren: () =>
          import("../components/employers/employers.module").then(
            (m) => m.EmployersModule
          ),
      },


      // {
      //   path: "expenses-sales",
      //   children: [
      //     {
      //       path: 'transactions',
      //       loadChildren: () => import('./expenses/transactions/transactions.module').then(m => m.TransactionsModule)
      //     },
      //     {
      //       path: 'products-services',
      //       loadChildren: () => import('./expenses/prodserv/prodserv.module').then(m => m.ProdservModule)
      //     },
      //     {
      //       path: 'suppliers',
      //       loadChildren: () => import('./expenses/suppliers/suppliers.module').then(m => m.SuppliersModule)
      //     },
      //     {
      //       path: 'customers',
      //       loadChildren: () => import('./expenses/customers/customers.module').then(m => m.CustomersModule)
      //     },
      //   ]
      // },

      // {
      //   path: "redirection/:refreshToken",
      //   loadChildren: () =>
      //     import("./redirection/redirection.module").then(
      //       (m) => m.RedirectionModule
      //     ),
      // },

    ],
  },

  {
    path: "app",
    children: [
      {
        path: "redirection/:refreshToken",
        loadChildren: () =>
          import("./redirection/redirection.module").then(
            (m) => m.RedirectionModule
          ),
      },

    ],
  },

  {
    path: "",
    redirectTo: "/signin",
    pathMatch: "full",
  },
  {
    path: "**",
    component: NotfoundComponent,
  },



];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[AuthGuard],
  exports: [RouterModule],
})
export class ComponentsRoutingModule { }

