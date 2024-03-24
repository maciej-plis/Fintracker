import { Component, inject, signal } from '@angular/core';
import { PurchaseDTO, PurchasesApi } from '@core/api';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.view.html',
  styleUrls: ['./add-purchase.view.scss']
})
export class AddPurchaseView {

  private readonly purchasesApi = inject(PurchasesApi);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  protected readonly formPristine = signal(true);

  protected onSubmitted(purchase: PurchaseDTO) {
    this.purchasesApi.addPurchase({
      date: purchase.date,
      shopId: purchase.shop.id,
      products: purchase.products.map(product => ({
        id: product.id,
        categoryId: product.category.id,
        name: product.name,
        amount: product.amount,
        price: product.price,
        description: product.description
      }))
    }).subscribe(() => {
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Purchase saved successfully.'});
      this.navigateBackToPurchasesScreen();
    });
  }

  protected onCancelled() {
    this.navigateBackToPurchasesScreen();
  }

  private navigateBackToPurchasesScreen(): Observable<boolean> {
    return fromPromise(this.router.navigate(['expenses', 'purchases']));
  }
}
