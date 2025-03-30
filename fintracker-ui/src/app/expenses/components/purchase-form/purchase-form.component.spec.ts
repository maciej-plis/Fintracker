import { PurchaseFormComponent } from './purchase-form.component';

import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { HttpClient } from '@angular/common/http';
import { CategoriesService, ShopsService } from 'src/app/expenses/services';
import { DialogService } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { ShopDTO } from '@core/api';
import { ProductsInputTableComponent } from 'src/app/expenses/components/products-table/products-input-table.component';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';

describe('PurchaseFormComponent', () => {

  beforeEach(() => MockBuilder(PurchaseFormComponent)
    .keep(ReactiveFormsModule)
    .keep(ProductsInputTableComponent)
    .mock(HttpClient)
    .mock(CategoriesService)
    .mock(ShopsService, {
      shops: signal<ShopDTO[]>([])
    })
    .mock(DialogService));

  beforeEach(() => {
    registerLocaleData(localePl, 'pl-PL', localePlExtra);
  })

  it('Should create', () => {
    MockInstance(ShopsService, 'shops', signal<ShopDTO[]>([]));

    const fixture = MockRender(PurchaseFormComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
