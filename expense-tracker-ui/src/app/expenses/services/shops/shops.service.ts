import { inject, Injectable } from '@angular/core';
import { ShopDTO, ShopsApi } from '@core/api';
import { DialogService, ErrorService } from '@shared/services';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, catchError, Observable, switchMap, tap } from 'rxjs';
import { AddShopDialog } from 'src/app/expenses/dialogs';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  private readonly shopsApi = inject(ShopsApi);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly errorService = inject(ErrorService);

  private readonly shopsSubject = new BehaviorSubject([] as ShopDTO[]);
  public readonly shops$ = this.shopsSubject.asObservable();

  constructor() {
    this.refreshShops();
  }

  public refreshShops() {
    this.shopsApi.getShops().subscribe(shops =>
      this.shopsSubject.next(shops)
    );
  }

  public addShop(): Observable<ShopDTO | never> {
    return this.openAddShopDialog().pipe(
      switchMap(shop => this.shopsApi.addShop(shop)),
      switchMap(shopId => this.shopsApi.getShop(shopId)),
      tap(shop => {
        this.shopsSubject.next([...this.shopsSubject.value, shop]);
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'Shop added successfully'});
      }),
      catchError(this.errorService.handleApiError('Failed to add new shop'))
    );
  }

  private openAddShopDialog(): Observable<ShopDTO> {
    return this.dialogService.open(AddShopDialog, {
      header: 'Add new shop'
    });
  }
}
