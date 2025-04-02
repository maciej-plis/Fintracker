import { PurchaseFormComponent } from './purchase-form.component';

import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { CategoriesService, ShopsService } from 'src/app/expenses/services';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { ProductsApi, ShopDTO } from '@core/api';
import { ProductsInputTableComponent } from 'src/app/expenses/components/products-table/products-input-table.component';
import { PurchaseForm, PurchaseFormService } from '@expenses/services/purchase-form/purchase-form.service';
import { AutoComplete } from 'primeng/autocomplete';
import { getSpyObj } from '@shared/utils/test.utils';
import { AddShopDialog } from '@expenses/dialogs';
import { EMPTY, Subject } from 'rxjs';
import { DialogService } from '@shared/services';
import { ErrorDirective, ErrorsDirective } from '@ngspot/ngx-errors';
import createSpy = jasmine.createSpy;
import objectContaining = jasmine.objectContaining;

const addItemOption: ShopDTO = (PurchaseFormComponent as any).ADD_SHOP_ITEM_OPTION;

describe('PurchaseFormComponent', () => {

  MockInstance.scope();

  beforeEach(() => MockBuilder(PurchaseFormComponent)
    .keep(ReactiveFormsModule)
    .keep(ErrorsDirective)
    .keep(ErrorDirective)
    .keep(ProductsInputTableComponent)
    .mock(PurchaseFormService, {
      form: new FormGroup<PurchaseForm>({
        shop: new FormControl(null),
        date: new FormControl(null),
        products: new FormControl([], { nonNullable: true })
      }),
      submit: createSpy()
    })
    .mock(ProductsApi)
    .mock(CategoriesService)
    .mock(ShopsService, {
      shops: signal<ShopDTO[]>([
        { id: '1', name: 'Auchan' },
        { id: '2', name: 'Aldi' },
        { id: '3', name: 'Aldik' },
        { id: '4', name: 'Biedronka' },
        { id: '5', name: 'Lidl' }
      ])
    })
    .mock(DialogService, {
      open: createSpy()
    }));

  it('Should create', () => {
    const fixture = MockRender(PurchaseFormComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });

  it('Should update suggestions when filter changes and add option to add new shop', () => {
    const fixture = MockRender(PurchaseFormComponent);

    const shopAutoComplete = ngMocks.find(AutoComplete);

    ngMocks.trigger(shopAutoComplete, 'completeMethod', { query: 'A' } as any);
    fixture.detectChanges();

    expect(ngMocks.input(shopAutoComplete, 'suggestions')).toEqual([
      { id: '1', name: 'Auchan' },
      { id: '2', name: 'Aldi' },
      { id: '3', name: 'Aldik' },
      addItemOption
    ]);

    ngMocks.trigger(shopAutoComplete, 'completeMethod', { query: 'Al' } as any);
    fixture.detectChanges();

    expect(ngMocks.input(shopAutoComplete, 'suggestions')).toEqual([
      { id: '2', name: 'Aldi' },
      { id: '3', name: 'Aldik' },
      addItemOption
    ]);

    ngMocks.trigger(shopAutoComplete, 'completeMethod', { query: 'All' } as any);
    fixture.detectChanges();

    expect(ngMocks.input(shopAutoComplete, 'suggestions')).toEqual([
      addItemOption
    ]);
  });

  it('Should open dialog when add shop option is selected', () => {
    const dialogServiceSpy = getSpyObj(DialogService);
    dialogServiceSpy.open.and.returnValue(EMPTY);

    const fixture = MockRender(PurchaseFormComponent);

    const shopAutoComplete = ngMocks.find(AutoComplete);

    ngMocks.trigger(shopAutoComplete, 'completeMethod', { query: 'All' } as any);
    fixture.detectChanges();

    ngMocks.trigger(shopAutoComplete, 'onSelect', { value: addItemOption } as any);
    fixture.detectChanges();

    expect(dialogServiceSpy.open).toHaveBeenCalledWith(AddShopDialog, objectContaining({ data: { name: 'All' } }));
  });

  it('Should set shop when add shop dialog is closed with result', () => {
    const emitter = new Subject();

    const dialogServiceSpy = getSpyObj(DialogService);
    dialogServiceSpy.open.and.returnValue(emitter.asObservable());

    const fixture = MockRender(PurchaseFormComponent);

    const shopAutoComplete = ngMocks.find(AutoComplete);

    ngMocks.trigger(shopAutoComplete, 'onSelect', { value: addItemOption } as any);
    fixture.detectChanges();

    emitter.next({ id: '6', name: 'Allegro' });
    fixture.detectChanges();

    const purchaseFormService = ngMocks.get(PurchaseFormService);
    expect(purchaseFormService.form.controls.shop.getRawValue()).toEqual({ id: '6', name: 'Allegro' });
  });

  it('Should reset shop when add shop dialog is closed without result', () => {
    const emitter = new Subject();

    const dialogServiceSpy = getSpyObj(DialogService);
    dialogServiceSpy.open.and.returnValue(emitter.asObservable());

    const fixture = MockRender(PurchaseFormComponent);

    const shopAutoComplete = ngMocks.find(AutoComplete);

    ngMocks.trigger(shopAutoComplete, 'onSelect', { value: addItemOption } as any);
    fixture.detectChanges();

    emitter.next(void 0);
    fixture.detectChanges();

    const purchaseFormService = ngMocks.get(PurchaseFormService);
    expect(purchaseFormService.form.controls.shop.getRawValue()).toEqual(null);
  });

  it('Should call submit when form is submitted', () => {
    const purchaseFormServiceSpy = getSpyObj(PurchaseFormService);

    MockRender(PurchaseFormComponent);

    const form = ngMocks.find('form');
    ngMocks.trigger(form, 'ngSubmit');

    expect(purchaseFormServiceSpy.submit).toHaveBeenCalled();
  });
});
