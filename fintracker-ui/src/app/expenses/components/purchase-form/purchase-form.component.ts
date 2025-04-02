import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ShopDTO } from '@core/api';
import { ReactiveFormsModule } from '@angular/forms';
import { startsWithIgnoreCase } from '@shared/utils/string.utils';
import { AutoComplete, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { ShopsService } from 'src/app/expenses/services';
import { DialogService } from '@shared/services';
import { AddShopDialog } from 'src/app/expenses/dialogs';
import { AddShopDialogData } from 'src/app/expenses/dialogs/add-shop/add-shop.dialog';
import { CalendarComponent } from '@shared/components/calendar/calendar.component';
import { ProductsInputTableComponent } from 'src/app/expenses/components/products-table/products-input-table.component';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { PurchaseFormService } from '@expenses/services/purchase-form/purchase-form.service';
import { Observable } from 'rxjs';
import { NGX_ERRORS_DECLARATIONS } from '@ngspot/ngx-errors';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrl: './purchase-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    ProductsInputTableComponent,
    CalendarComponent,
    ButtonModule,
    AutoComplete,
    FloatLabel,
    NGX_ERRORS_DECLARATIONS
  ]
})
export class PurchaseFormComponent {

  private static readonly ADD_SHOP_ITEM_OPTION: ShopDTO = { id: 'new-item', name: '(Add Item)' };

  protected readonly formService = inject(PurchaseFormService);
  private readonly shopsService = inject(ShopsService);
  private readonly dialogService = inject(DialogService);

  protected readonly form = this.formService.form;

  protected shopFilter$ = signal('', { equal: () => false });
  protected shops$ = this.shopsService.shops;
  protected filteredShops$ = computed(() => {
    const filteredShops = this.shops$().filter(shop => startsWithIgnoreCase(shop.name, this.shopFilter$()));
    return [ ...filteredShops, PurchaseFormComponent.ADD_SHOP_ITEM_OPTION ];
  });

  public onShopSelection(event: AutoCompleteSelectEvent) {
    if (event.value !== PurchaseFormComponent.ADD_SHOP_ITEM_OPTION) return;
    this.form.controls.shop.reset();
    this.openAddShopDialog().subscribe(shop => shop && this.form.controls.shop.setValue(shop));
  }

  private openAddShopDialog(): Observable<ShopDTO | null> {
    return this.dialogService.open<ShopDTO | null>(AddShopDialog, {
      data: {
        name: this.shopFilter$()
      } as AddShopDialogData
    });
  }
}
