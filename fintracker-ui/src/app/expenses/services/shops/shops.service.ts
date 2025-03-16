import { inject, Injectable, signal } from '@angular/core';
import { AddShopRequest, ShopDTO, ShopsApi } from '@core/api';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  private readonly shopsApi = inject(ShopsApi);

  private readonly _shops = signal<ShopDTO[]>([]);
  public readonly shops = this._shops.asReadonly();

  public constructor() {
    this.refreshShops();
  }

  public refreshShops() {
    this.shopsApi.getShops().subscribe(shops =>
      this._shops.set(shops)
    );
  }

  public saveShop(dto: AddShopRequest): Observable<ShopDTO> {
    return this.shopsApi.addShop(dto).pipe(
      switchMap(shopId => this.shopsApi.getShop(shopId)),
      tap(shop => this._shops.update(shops => [...shops, shop]))
    );
  }
}
