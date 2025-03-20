import { Routes } from '@angular/router';

export const routes: Routes = [
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
