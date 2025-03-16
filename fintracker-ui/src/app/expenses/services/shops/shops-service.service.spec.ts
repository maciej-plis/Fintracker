import { ShopsService } from './shops.service';
import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { ShopDTO, ShopsApi } from '@core/api';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

describe('ShopsService', () => {

  const SHOPS: ShopDTO[] = [
    {id: '1', name: 'Biedronka'},
    {id: '2', name: 'Lidl'}
  ];

  const NEW_SHOP: ShopDTO = {id: '3', name: 'Auchan'};

  MockInstance.scope();

  beforeEach(() => MockBuilder(ShopsService)
    .mock(ShopsApi, {getShops: () => of(SHOPS as any)})
  );

  it('Should create', () => {
    const service = MockRender(ShopsService).componentInstance;
    expect(service).toBeDefined();
  });

  it('Should load shops on init', () => {
    const getShopsSpy = MockInstance(ShopsApi, 'getShops', createSpy('getShopsSpy'));

    getShopsSpy.and.returnValue(of(SHOPS as any));

    const service = MockRender(ShopsService).componentInstance;

    expect(getShopsSpy).toHaveBeenCalled();
    expect(service.shops()).toEqual(SHOPS);
  });

  it('Should load shops when refresh is called', () => {
    const getShopsSpy = MockInstance(ShopsApi, 'getShops', createSpy('getShopsSpy'));

    getShopsSpy.and.returnValue(of(SHOPS as any));

    const service = MockRender(ShopsService).componentInstance;

    service.refreshShops();

    expect(getShopsSpy).toHaveBeenCalled();
    expect(service.shops()).toEqual(SHOPS);
  });

  it('Should save new shop and return it', () => {
    const addShopSpy = MockInstance(ShopsApi, 'addShop', createSpy('addShopSpy'));
    addShopSpy.and.returnValue(of('3' as any));

    const getShopSpy = MockInstance(ShopsApi, 'getShop', createSpy('getShopSpy'));
    getShopSpy.and.returnValue(of(NEW_SHOP as any));

    const service = MockRender(ShopsService).componentInstance;

    service.saveShop({name: 'Auchan'}).subscribe(shop => {
      expect(addShopSpy).toHaveBeenCalledWith({name: 'Auchan'});
      expect(getShopSpy).toHaveBeenCalledWith('3');
      expect(shop).toEqual(NEW_SHOP);
    });
  });

  it('Should update state with new shop after saving', () => {
    const addShopSpy = MockInstance(ShopsApi, 'addShop', createSpy('addShopSpy'));
    addShopSpy.and.returnValue(of('3' as any));

    const getShopSpy = MockInstance(ShopsApi, 'getShop', createSpy('getShopSpy'));
    getShopSpy.and.returnValue(of(NEW_SHOP as any));

    const service = MockRender(ShopsService).componentInstance;

    service.saveShop({name: 'Auchan'}).subscribe();

    expect(service.shops()).toEqual([...SHOPS, NEW_SHOP]);
  });
});
