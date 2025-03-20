import { Routes } from '@angular/router';
import { DashboardView } from './views';
import { PurchasesView } from 'src/app/expenses/views/purchases/purchases.view';
import { AddPurchaseView } from 'src/app/expenses/views/add-purchase/add-purchase.view';
import { EditPurchaseView } from 'src/app/expenses/views/edit-purchase/edit-purchase.view';

export const routes: Routes = [
  {
    path: 'purchases',
    data: {
      breadcrumb: {
        label: 'Purchases'
      }
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        component: PurchasesView
      },
      {
        path: 'add',
        data: {
          breadcrumb: {
            label: 'Add'
          }
        },
        component: AddPurchaseView
      },
      {
        path: 'edit/:purchaseId',
        data: {
          breadcrumb: {
            label: 'Edit'
          }
        },
        component: EditPurchaseView
      }
    ]
  },
  {
    path: 'dashboard',
    data: {
      breadcrumb: {
        label: 'Dashboard'
      }
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        component: DashboardView
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
