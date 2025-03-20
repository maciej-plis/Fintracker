import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { ProductDTO, PurchaseDTO, ShopDTO } from '@core/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { startsWithIgnoreCase } from '@shared/utils/string.utils';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { ShopsService } from 'src/app/expenses/services';
import { markFormAsDirty } from '@shared/utils/form.utils';
import { v4 as randomUUID } from 'uuid';
import { startWith } from 'rxjs';
import { DialogService } from '@shared/services';
import { AddShopDialog } from 'src/app/expenses/dialogs';
import { AddShopDialogData } from 'src/app/expenses/dialogs/add-shop/add-shop.dialog';
import { CalendarComponent } from '@shared/components/calendar/calendar.component';
import { ProductsInputTableComponent } from 'src/app/expenses/components/products-table/products-input-table.component';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    AutoCompleteModule,
    CalendarComponent,
    ProductsInputTableComponent,
    ButtonModule
  ]
})
export class PurchaseFormComponent {

  private static readonly ADD_SHOP_ITEM_OPTION: ShopDTO = {id: '', name: '(Add Item)'};

  public readonly purchase = input<PurchaseDTO | undefined | null>(null);

  protected readonly submitted = output<PurchaseDTO>();
  protected readonly cancelled = output<void>();
  protected readonly pristine = output<boolean>();

  private readonly shopsService = inject(ShopsService);
  private readonly dialogService = inject(DialogService);

  protected idControl = new FormControl<string>(randomUUID(), {nonNullable: true, validators: [Validators.required]});
  protected shopControl = new FormControl<ShopDTO | null>(null, [Validators.required]);
  protected dateControl = new FormControl<string | null>(null, [Validators.required]);
  protected productsControl = new FormControl<ProductDTO[]>([], {nonNullable: true, validators: [Validators.required]});
  protected purchaseControlGroup = new FormGroup<PurchaseForm>({
    id: this.idControl,
    shop: this.shopControl,
    date: this.dateControl,
    products: this.productsControl
  });

  protected shopFilter$ = signal('', {equal: () => false});
  protected shops$ = this.shopsService.shops;
  protected filteredShops$ = computed(() => {
    const filteredShops = this.shops$().filter(shop => startsWithIgnoreCase(shop.name, this.shopFilter$()));
    return [...filteredShops, PurchaseFormComponent.ADD_SHOP_ITEM_OPTION];
  });

  constructor() {
    effect(() => {
      const purchase = this.purchase();
      purchase && this.purchaseControlGroup.reset(purchase);
    }, {allowSignalWrites: true});

    this.purchaseControlGroup.statusChanges.pipe(
      startWith(null)
    ).subscribe(() => {
      this.pristine.emit(this.purchaseControlGroup.pristine);
    });
  }

  public onShopSelection(event: AutoCompleteSelectEvent) {
    if (event.value !== PurchaseFormComponent.ADD_SHOP_ITEM_OPTION) return;
    this.shopControl.reset();
    this.dialogService.open<ShopDTO | null>(AddShopDialog, {
      data: {
        name: this.shopFilter$()
      } as AddShopDialogData
    }).subscribe(shop => shop && this.shopControl.setValue(shop));
  }

  public onFormSubmit() {
    markFormAsDirty(this.purchaseControlGroup);
    if (!this.purchaseControlGroup.valid) return;
    this.submitted.emit(this.purchaseControlGroup.getRawValue() as PurchaseDTO);
  }

  public onCancelBtnClick() {
    this.cancelled.emit();
  }
}

export interface PurchaseForm {
  id: FormControl<string>;
  shop: FormControl<ShopDTO | null>;
  date: FormControl<string | null>;
  products: FormControl<ProductDTO[]>;
}
