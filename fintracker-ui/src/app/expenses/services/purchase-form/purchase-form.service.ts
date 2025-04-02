import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddPurchaseRequest, ProductDTO, PurchaseDTO, ShopDTO, UpdatePurchaseRequest } from '@core/api';
import { Subject } from 'rxjs';
import { markFormAsDirty } from '@shared/utils';

@Injectable()
export class PurchaseFormService {

  private readonly fb = inject(FormBuilder);

  public readonly form = this.fb.group<PurchaseForm>({
    shop: this.fb.control(null, [ Validators.required ]),
    date: this.fb.control(null, [ Validators.required ]),
    products: this.fb.nonNullable.control([], [ Validators.required ])
  });

  private readonly submittedSubject = new Subject<AddPurchaseRequest | UpdatePurchaseRequest>();
  public readonly submitted$ = this.submittedSubject.asObservable();

  public submit(): void {
    this.form.updateValueAndValidity();

    if (!this.form.valid) {
      markFormAsDirty(this.form);
      return;
    }

    const value = this.form.getRawValue() as PurchaseDTO;
    this.submittedSubject.next({
      shopId: value.shop.id,
      date: value.date,
      products: value.products.map(p => ({
        id: p.id,
        categoryId: p.category.id,
        name: p.name,
        amount: p.amount,
        price: p.price,
        description: p.description
      }))
    });
  }

  public reset(purchase: PurchaseDTO | undefined = undefined): void {
    this.form.reset(purchase);
  }
}

export interface PurchaseForm {
  shop: FormControl<ShopDTO | null>;
  date: FormControl<string | null>;
  products: FormControl<(ProductDTO)[]>;
}

