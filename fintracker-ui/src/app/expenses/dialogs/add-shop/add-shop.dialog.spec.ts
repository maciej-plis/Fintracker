import { AddShopDialog } from './add-shop.dialog';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { ShopsService } from 'src/app/expenses/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AutoFocus } from 'primeng/autofocus';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorDirective, ErrorsDirective, NgxErrorsFormDirective } from '@ngspot/ngx-errors';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { of, Subject, throwError } from 'rxjs';
import { ShopDTO } from '@core/api';
import { getSpyObj } from '@shared/utils/test.utils';
import createSpy = jasmine.createSpy;

describe('AddShopDialog', () => {

  MockInstance.scope();

  beforeEach(() => MockBuilder(AddShopDialog)
    .keep(ReactiveFormsModule)
    .keep(InputTextModule)
    .keep(ButtonModule)
    .keep(AutoFocus)
    .keep(MessageModule)
    .keep(ErrorsDirective)
    .keep(ErrorDirective)
    .keep(NgxErrorsFormDirective)
    .mock(ShopsService, {
      saveShop: createSpy()
    })
    .mock(DynamicDialogRef, {
      close: createSpy()
    })
    .mock(DynamicDialogConfig, {
      data: { name: 'Auchan' }
    })
  );

  it('Should create', () => {
    const fixture = MockRender(AddShopDialog);
    expect(fixture.point.componentInstance).toBeDefined();
  });

  it('Should set dialog header', () => {
    const setHeaderSpy = MockInstance(DynamicDialogConfig, 'header', createSpy(), 'set');

    MockRender(AddShopDialog);

    expect(setHeaderSpy).toHaveBeenCalledWith('Add new shop');
  });

  it('Should focus name input', async () => {
    const fixture = MockRender(AddShopDialog);
    await fixture.whenStable();

    const shopNameInput = ngMocks.find('#shopName');
    expect(document.activeElement).toEqual(shopNameInput.nativeElement);
  });

  it('Should have empty initial input if no param', () => {
    MockInstance(DynamicDialogConfig, 'data', {});

    MockRender(AddShopDialog);

    const shopNameInput = ngMocks.find('#shopName');
    expect(shopNameInput.nativeElement.value).toEqual('');
  });

  it('Should have initial input taken from param', () => {
    MockRender(AddShopDialog);

    const shopNameInput = ngMocks.find('#shopName');
    expect(shopNameInput.nativeElement.value).toEqual('Auchan');
  });

  describe('cancel', () => {
    it('Should close dialog', () => {
      MockRender(AddShopDialog);

      ngMocks.click('button[type="button"]');

      expect(getSpyObj(DynamicDialogRef).close).toHaveBeenCalledWith();
    });
  });

  describe('submit', () => {
    it('Should save shop and close dialog with saved result', () => {
      getSpyObj(ShopsService).saveShop.and.returnValue(of({ id: '1', name: 'Auchan' }));

      MockRender(AddShopDialog);

      ngMocks.trigger('form', 'ngSubmit');

      expect(getSpyObj(ShopsService).saveShop).toHaveBeenCalledWith({ name: 'Auchan' });
      expect(getSpyObj(DynamicDialogRef).close).toHaveBeenCalledWith({ id: '1', name: 'Auchan' });
    });

    it('Should disable form while submit is progress', () => {
      const emitter = new Subject<ShopDTO>();
      getSpyObj(ShopsService).saveShop.and.returnValue(emitter.asObservable());

      const fixture = MockRender(AddShopDialog);

      ngMocks.trigger('form', 'ngSubmit');
      fixture.detectChanges();

      expect(ngMocks.find('input').nativeElement.disabled).toEqual(true);
      expect(ngMocks.find('button[type="submit"]').nativeElement.disabled).toEqual(true);

      emitter.next({} as ShopDTO);
      fixture.detectChanges();

      expect(ngMocks.find('input').nativeElement.disabled).toEqual(false);
      expect(ngMocks.find('button[type="submit"]').nativeElement.disabled).toEqual(false);
    });

    it('Should not close dialog when submit fails', () => {
      getSpyObj(ShopsService).saveShop.and.returnValue(throwError(() => ({ status: 409 })));

      MockRender(AddShopDialog);

      ngMocks.trigger('form', 'ngSubmit');

      expect(getSpyObj(DynamicDialogRef).close).not.toHaveBeenCalled();
    });
  });
});
