import { ShopsService } from './shops.service';
import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { ShopDTO, ShopsApi } from '@core/api';
import { of } from 'rxjs';
import { getSpyObj } from '@shared/utils/test.utils';
import createSpy = jasmine.createSpy;

const shops: ShopDTO[] = [
  { id: '1', name: 'Biedronka' },
  { id: '2', name: 'Lidl' }
];

const newShop: ShopDTO = { id: '3', name: 'Auchan' };

describe('ShopsService', () => {

  MockInstance.scope();

  beforeEach(() => MockBuilder(ShopsService)
    .mock(ShopsApi, {
      getShops: createSpy().and.returnValue(of(shops as any)),
      getShop: createSpy(),
      addShop: createSpy()
    })
  );

  it('Should create', () => {
    const fixture = MockRender(ShopsService);
    expect(fixture.point.componentInstance).toBeDefined();
  });

  it('Should load shops on init', () => {
    const fixture = MockRender(ShopsService);
    const service = fixture.point.componentInstance;

    expect(getSpyObj(ShopsApi).getShops).toHaveBeenCalled();
    expect(service.shops()).toEqual(shops);
  });

  describe('refreshShops', () => {
    it('Should load shops when refresh is called', () => {
      const fixture = MockRender(ShopsService);
      const service = fixture.point.componentInstance;

      service.refreshShops();

      expect(getSpyObj(ShopsApi).getShops).toHaveBeenCalled();
      expect(service.shops()).toEqual(shops);
    });
  });

  describe('saveShop', () => {

    beforeEach(() => {
      getSpyObj(ShopsApi).addShop.and.returnValue(of('3' as any));
      getSpyObj(ShopsApi).getShop.and.returnValue(of(newShop as any));
    });

    it('Should save new shop and return it', () => {
      const fixture = MockRender(ShopsService);
      const service = fixture.point.componentInstance;

      service.saveShop({ name: 'Auchan' }).subscribe(shop => {
        expect(getSpyObj(ShopsApi).addShop).toHaveBeenCalledWith({ name: 'Auchan' });
        expect(getSpyObj(ShopsApi).getShop).toHaveBeenCalledWith('3');
        expect(shop).toEqual(newShop);
      });
    });

    it('Should update state with new shop after saving', () => {
      const fixture = MockRender(ShopsService);
      const service = fixture.point.componentInstance;

      service.saveShop({ name: 'Auchan' }).subscribe(() => {
        expect(service.shops()).toEqual([ ...shops, newShop ]);
      });
    });
  });
});
