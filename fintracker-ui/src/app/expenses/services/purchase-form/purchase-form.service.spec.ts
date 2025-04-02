import { PurchaseFormService } from './purchase-form.service';

import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { ProductDTO, PurchaseDTO } from '@core/api';
import createSpy = jasmine.createSpy;

const product: ProductDTO = { id: '1', category: { id: '1', name: 'Food' }, name: 'Bread', amount: 1, price: 4.75, description: 'for breakfast' };
const purchase: PurchaseDTO = {
  id: '1',
  shop: { id: '1', name: 'Lidl' },
  date: '2024-10-12',
  products: [ product ]
};

describe('PurchaseFormService', () => {

  MockInstance.scope();

  beforeEach(() => MockBuilder(PurchaseFormService));

  it('Should create', () => {
    const fixture = MockRender(PurchaseFormService);
    expect(fixture.point.componentInstance).toBeDefined();
  });

  describe('submit', () => {
    it('Should emit purchase when valid form is submitted', () => {
      const spy = createSpy();

      const fixture = MockRender(PurchaseFormService);
      const service = fixture.point.componentInstance;

      service.form.patchValue(purchase);

      service.submitted$.subscribe(spy);
      service.submit();

      expect(spy).toHaveBeenCalledWith({
        shopId: '1',
        date: '2024-10-12',
        products: [ {
          id: '1',
          categoryId: '1',
          name: 'Bread',
          amount: 1,
          price: 4.75,
          description: 'for breakfast'
        } ]
      });
    });

    it('Should emit any value when invalid form is submitted', () => {
      const spy = createSpy();

      const fixture = MockRender(PurchaseFormService);
      const service = fixture.point.componentInstance;

      service.submitted$.subscribe(spy);
      service.submit();

      expect(spy).not.toHaveBeenCalled();
    });

    it('Should mark form as invalid and dirty when invalid form is submitted', () => {
      const spy = createSpy();

      const fixture = MockRender(PurchaseFormService);
      const service = fixture.point.componentInstance;

      service.submitted$.subscribe(spy);
      service.submit();

      expect(service.form.invalid).toEqual(true);
      expect(service.form.dirty).toEqual(true);
    });
  });

  describe('reset', () => {
    it('Should reset form to default values', () => {
      const fixture = MockRender(PurchaseFormService);
      const service = fixture.point.componentInstance;

      service.submit();
      service.reset();

      expect(service.form.pristine).toEqual(true);
      expect(service.form.untouched).toEqual(true);
      expect(service.form.getRawValue()).toEqual({
        shop: null,
        date: null,
        products: []
      });
    });

    it('Should reset form to provided purchase', () => {
      const fixture = MockRender(PurchaseFormService);
      const service = fixture.point.componentInstance;

      service.submit();
      service.reset(purchase);

      expect(service.form.pristine).toEqual(true);
      expect(service.form.untouched).toEqual(true);
      expect(service.form.getRawValue()).toEqual({
        shop: purchase.shop,
        date: purchase.date,
        products: purchase.products
      });
    });
  });
});
