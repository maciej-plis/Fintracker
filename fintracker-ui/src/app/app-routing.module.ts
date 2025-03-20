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
    loadChildren: () => import('src/app/expenses/expenses.routes').then(r => r.routes)
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
