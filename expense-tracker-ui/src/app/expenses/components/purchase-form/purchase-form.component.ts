import { ChangeDetectionStrategy, Component, computed, HostListener, inject, Input, signal } from '@angular/core';
import { ProductDTO, PurchaseDTO, PurchasesApi, ShopDTO } from '@core/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { startsWithIgnoreCase } from '@shared/utils/string.utils';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Observable } from 'rxjs';
import { AutoComplete, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { ShopsService } from 'src/app/expenses/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { markFormAsDirty } from '@shared/utils/form.utils';
import { v4 as randomUUID } from 'uuid';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PurchaseFormComponent {

  private static readonly ADD_SHOP_ITEM_OPTION: ShopDTO = {id: '', name: '(Add Item)'};

  private edit = false;

  @Input()
  set purchase(purchase: PurchaseDTO | null) {
    if (!purchase) return;
    this.edit = true;
    this.idControl.setValue(purchase.id);
    this.shopControl.setValue(purchase.shop);
    this.dateControl.setValue(new Date(purchase.date));
    this.productsControl.setValue(purchase.products);
  }

  private readonly messageService = inject(MessageService);
  private readonly purchaseApi = inject(PurchasesApi);
  private readonly shopsService = inject(ShopsService);
  private readonly router = inject(Router);

  protected idControl = new FormControl<string>(randomUUID(), {nonNullable: true, validators: [Validators.required]});
  protected shopControl = new FormControl<ShopDTO | null>(null, [Validators.required]);
  protected dateControl = new FormControl<Date | null>(null, [Validators.required]);
  protected productsControl = new FormControl<ProductDTO[]>([], {nonNullable: true, validators: [Validators.required]});
  protected formGroup = new FormGroup<PurchaseForm>({
    id: this.idControl,
    shop: this.shopControl,
    date: this.dateControl,
    products: this.productsControl
  });

  protected shopFilter$ = signal('', {equal: () => false});
  protected shops$ = toSignal(this.shopsService.shops$, {initialValue: []});
  protected filteredShops$ = computed(() => {
    const filteredShops = this.shops$().filter(shop => startsWithIgnoreCase(shop.name, this.shopFilter$()));
    return [...filteredShops, PurchaseFormComponent.ADD_SHOP_ITEM_OPTION];
  });

  @HostListener('keydown.alt.enter', ['$event'])
  onAltEnter(event: any) {
  }

  constructor() {
    const origOnKeydown = AutoComplete.prototype.onKeyDown;
    AutoComplete.prototype.onKeyDown = function (event: KeyboardEvent) {
      if (event.key === 'Tab') {
        if (this.focusedOptionIndex() !== -1) {
          this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()], false);
        }
        this.hide();
        return;
      }
      origOnKeydown.apply(this, [event]);
    };
  }

  public onShopSelection(event: AutoCompleteSelectEvent) {
    if (event.value != PurchaseFormComponent.ADD_SHOP_ITEM_OPTION) return;
    this.shopControl.setValue(null);
    this.shopControl.markAsPristine();

    this.shopsService.addShop()
      .subscribe(shop => this.shopControl.setValue(shop));
  }

  public savePurchase() {
    markFormAsDirty(this.formGroup);
    if (!this.formGroup.valid) return;

    if (this.edit) {
      this.purchaseApi.updatePurchase(this.idControl.value, {
        date: this.utcDate(this.dateControl.value!).toISOString().substring(0, 10),
        shopId: this.shopControl.value!.id,
        products: this.productsControl.value!.map(product => ({
          id: product.id,
          categoryId: product?.category!.id,
          name: product.name!,
          amount: product.amount!,
          price: product.price!,
          description: product.description
        }))
      }).subscribe(() => {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'Purchase updated successfully.'});
        this.navigateBackToPurchasesScreen();
      });
    } else {
      this.purchaseApi.addPurchase({
        date: this.utcDate(this.dateControl.value!).toISOString().substring(0, 10),
        shopId: this.shopControl.value!.id,
        products: this.productsControl.value!.map(product => ({
          id: product.id ?? '',
          categoryId: product?.category!.id,
          name: product.name!,
          amount: product.amount!,
          price: product.price!,
          description: product.description
        }))
      }).subscribe(() => {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'Purchase saved successfully.'});
        this.navigateBackToPurchasesScreen();
      });
    }
  }

  public cancel() {
    this.navigateBackToPurchasesScreen();
  }

  private navigateBackToPurchasesScreen(): Observable<boolean> {
    return fromPromise(this.router.navigate(['expenses', 'purchases']));
  }

  private utcDate(date: Date) {
    return new Date(Date.UTC(this.dateControl.value!.getFullYear(), this.dateControl.value!.getMonth(), this.dateControl.value!.getDate()));
  }
}

export interface PurchaseForm {
  id: FormControl<string>;
  shop: FormControl<ShopDTO | null>;
  date: FormControl<Date | null>;
  products: FormControl<ProductDTO[]>;
}
