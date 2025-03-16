import { AddShopDialog } from './add-shop.dialog';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { ShopsService } from 'src/app/expenses/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AutoFocusModule } from 'primeng/autofocus';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorDirective, ErrorsDirective, NgxErrorsFormDirective } from '@ngspot/ngx-errors';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { of, Subject, throwError } from 'rxjs';
import { ShopDTO } from '@core/api';
import createSpy = jasmine.createSpy;

describe('AddShopDialog', () => {

  MockInstance.scope();

  beforeEach(() => MockBuilder(AddShopDialog)
    .keep(AutoFocusModule)
    .keep(ButtonModule)
    .keep(InputTextModule)
    .keep(ReactiveFormsModule)
    .keep(MessageModule)
    .keep(ErrorsDirective)
    .keep(ErrorDirective)
    .keep(NgxErrorsFormDirective)
    .mock(ShopsService)
    .mock(DynamicDialogRef)
    .mock(DynamicDialogConfig)
  );

  it('Should create', () => {
    const fixture = MockRender(AddShopDialog);
    expect(fixture.componentInstance).toBeDefined();
  });

  it('Should set dialog header', () => {
    const setHeaderSpy = MockInstance(DynamicDialogConfig, 'header', createSpy('setHeader'), 'set');

    MockRender(AddShopDialog);

    expect(setHeaderSpy).toHaveBeenCalledWith('Add new shop');
  });

  it('Should focus name input', async () => {
    const fixture = MockRender(AddShopDialog);
    await fixture.whenStable();

    const categoryNameInput = ngMocks.find('#categoryName');
    expect(document.activeElement).toEqual(categoryNameInput.nativeElement);
  });

  it('Should have empty name input if no param', () => {
    MockInstance(DynamicDialogConfig, 'data', {});

    MockRender(AddShopDialog);

    const categoryNameInput = ngMocks.find('#categoryName');
    expect(categoryNameInput.nativeElement.value).toEqual('');
  });

  it('Should have name input taken from param', () => {
    MockInstance(DynamicDialogConfig, 'data', {name: 'Entertainment'});

    MockRender(AddShopDialog);

    const categoryNameInput = ngMocks.find('#categoryName');
    expect(categoryNameInput.nativeElement.value).toEqual('Entertainment');
  });

  it('Should close dialog', () => {
    const closeDialogSpy = MockInstance(DynamicDialogRef, 'close', createSpy('closeDialog'));

    MockRender(AddShopDialog);

    ngMocks.click('button[type="button"]');

    expect(closeDialogSpy).toHaveBeenCalledWith();
  });

  it('Should save shop and close dialog with saved result', () => {
    const closeDialogSpy = MockInstance(DynamicDialogRef, 'close', createSpy('closeDialog'));
    const saveShopSpy = MockInstance(ShopsService, 'saveShop', createSpy('saveShop'));
    MockInstance(DynamicDialogConfig, 'data', {name: 'Entertainment '});

    saveShopSpy.and.returnValue(of({name: 'Entertainment'}));

    MockRender(AddShopDialog);

    ngMocks.find('form').triggerEventHandler('ngSubmit');

    expect(saveShopSpy).toHaveBeenCalledWith({name: 'Entertainment '});
    expect(closeDialogSpy).toHaveBeenCalledWith({name: 'Entertainment'});
  });

  it('Should disable form while submit is processing', () => {
    const saveShopResponse = new Subject<ShopDTO>();

    MockInstance(DynamicDialogConfig, 'data', {name: 'Entertainment'});
    MockInstance(ShopsService, 'saveShop', _ => saveShopResponse.asObservable());

    const fixture = MockRender(AddShopDialog);

    ngMocks.find('form').triggerEventHandler('ngSubmit');
    fixture.detectChanges();

    expect(ngMocks.input('form', 'disableForm')).toEqual(true);

    saveShopResponse.next({} as ShopDTO);
    fixture.detectChanges();

    expect(ngMocks.input('form', 'disableForm')).toEqual(false);
  });

  it('Should not close dialog when submit fails', () => {
    const closeDialogSpy = MockInstance(DynamicDialogRef, 'close', createSpy('closeDialog'));
    MockInstance(DynamicDialogConfig, 'data', {name: 'Entertainment'});
    MockInstance(ShopsService, 'saveShop', _ => throwError(() => ({})));

    MockRender(AddShopDialog);

    ngMocks.find('form').triggerEventHandler('ngSubmit');

    expect(closeDialogSpy).not.toHaveBeenCalled();
  });
});
