import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { AddShopRequest, ShopDTO, ShopsApi } from '@core/api';
import { Observable, switchMap, tap } from 'rxjs';
import { connect } from 'ngxtension/connect';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ShopsService {

  private readonly shopsApi = inject(ShopsApi);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _shops = signal<ShopDTO[]>([]);
  public readonly shops = this._shops.asReadonly();

  public constructor() {
    this.refreshShops();
  }

  public refreshShops() {
    connect(this._shops, this.shopsApi.getShops(), this.destroyRef);
  }

  public saveShop(dto: AddShopRequest): Observable<ShopDTO> {
    return this.shopsApi.addShop(dto).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(shopId => this.shopsApi.getShop(shopId)),
      tap(shop => this._shops.update(shops => [ ...shops, shop ]))
    );
  }
}
