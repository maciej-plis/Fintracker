import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'expenses',
    data: {
      breadcrumb: {
        label: 'Expenses',
        disableRoute: true
      }
    },
    loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesModule)
  },
  {
    path: '**',
    redirectTo: 'expenses'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
