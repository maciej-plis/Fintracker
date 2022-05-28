import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./purchases/views";

const routes: Routes = [
  { path: 'purchases', loadChildren: () => import('./purchases/purchases.module').then(m => m.PurchasesModule) },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
