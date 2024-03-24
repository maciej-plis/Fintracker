import { ChangeDetectionStrategy, Component, computed, inject, Input, output, signal } from '@angular/core';
import { ProductDTO, PurchaseDTO, ShopDTO } from '@core/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { startsWithIgnoreCase } from '@shared/utils/string.utils';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { ShopsService } from 'src/app/expenses/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { markFormAsDirty } from '@shared/utils/form.utils';
import { v4 as randomUUID } from 'uuid';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PurchaseFormComponent {

  private static readonly ADD_SHOP_ITEM_OPTION: ShopDTO = {id: '', name: '(Add Item)'};

  @Input()
  public set purchase(purchase: PurchaseDTO | null) {
    if (purchase) this.purchaseControlGroup.reset(purchase);
  }

  protected readonly submitted = output<PurchaseDTO>();
  protected readonly cancelled = output<void>();
  protected readonly pristine = output<boolean>();

  private readonly shopsService = inject(ShopsService);

  protected idControl = new FormControl<string>(randomUUID(), {nonNullable: true, validators: [Validators.required]});
  protected shopControl = new FormControl<ShopDTO | null>(null, [Validators.required]);
  protected dateControl = new FormControl<string | null>(null, [Validators.required]);
  protected productsControl = new FormControl<ProductDTO[]>([], {nonNullable: true, validators: [Validators.required]});
  protected purchaseControlGroup = this.createPurchaseControlGroup();

  protected shopFilter$ = signal('', {equal: () => false});
  protected shops$ = toSignal(this.shopsService.shops$, {initialValue: []});
  protected filteredShops$ = computed(() => {
    const filteredShops = this.shops$().filter(shop => startsWithIgnoreCase(shop.name, this.shopFilter$()));
    return [...filteredShops, PurchaseFormComponent.ADD_SHOP_ITEM_OPTION];
  });

  constructor() {
    this.purchaseControlGroup.statusChanges.pipe(
      startWith(null)
    ).subscribe(() => {
      this.pristine.emit(this.purchaseControlGroup.pristine);
    });
  }

  public onShopSelection(event: AutoCompleteSelectEvent) {
    if (event.value != PurchaseFormComponent.ADD_SHOP_ITEM_OPTION) return;
    this.shopControl.setValue(null);
    this.shopControl.markAsPristine();
    this.shopsService.addShop().subscribe(shop => this.shopControl.setValue(shop));
  }

  public onFormSubmit() {
    markFormAsDirty(this.purchaseControlGroup);
    if (!this.purchaseControlGroup.valid) return;
    this.submitted.emit(this.purchaseControlGroup.getRawValue() as PurchaseDTO);
  }

  public onCancelBtnClick() {
    this.cancelled.emit();
  }

  private createPurchaseControlGroup() {
    return new FormGroup<PurchaseForm>({
      id: this.idControl,
      shop: this.shopControl,
      date: this.dateControl,
      products: this.productsControl
    });
  }
}

export interface PurchaseForm {
  id: FormControl<string>;
  shop: FormControl<ShopDTO | null>;
  date: FormControl<string | null>;
  products: FormControl<ProductDTO[]>;
}
