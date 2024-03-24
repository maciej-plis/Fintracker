import { Component, inject, signal } from '@angular/core';
import { PurchaseDTO, PurchasesApi } from '@core/api';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.view.html',
  styleUrls: ['./edit-purchase.view.scss']
})
export class EditPurchaseView {

  private readonly routeParams = inject(ActivatedRoute).params;
  private readonly purchasesApi = inject(PurchasesApi);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  protected readonly purchaseId = this.routeParams.pipe(map(params => params['purchaseId'] as string));
  protected readonly purchase = this.purchaseId.pipe(switchMap(purchaseId => this.purchasesApi.getPurchase(purchaseId)));

  protected readonly formPristine = signal(true);

  protected onSubmitted(purchase: PurchaseDTO) {
    this.purchaseId.pipe(
      switchMap(purchaseId => this.purchasesApi.updatePurchase(purchaseId, {
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
      }))
    ).subscribe(() => {
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Purchase updated successfully.'});
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
