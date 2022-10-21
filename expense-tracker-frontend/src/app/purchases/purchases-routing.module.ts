import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPurchasesComponent, PurchasesComponent } from "./views";

const routes: Routes = [
  { path: '', component: PurchasesComponent },
  { path: 'add', component: AddPurchasesComponent },
  { path: 'edit/:id', component: AddPurchasesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
