import { Component, inject, signal } from '@angular/core';
import { PurchaseDTO, PurchasesApi } from '@core/api';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { PurchaseFormComponent } from 'src/app/expenses/components';
import { injectParams } from 'ngxtension/inject-params';
import { derivedAsync } from 'ngxtension/derived-async';

@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.view.html',
  styleUrls: [ './edit-purchase.view.scss' ],
  imports: [
    CardModule,
    TagModule,
    PurchaseFormComponent
  ]
})
export class EditPurchaseView {

  private readonly purchasesApi = inject(PurchasesApi);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly router = inject(Router);

  protected readonly purchaseId = injectParams(params => params['purchaseId'] ?? '');
  protected readonly purchase = derivedAsync(() => this.purchasesApi.getPurchase(this.purchaseId()));

  protected readonly formPristine = signal(true);

  protected onSubmitted(purchase: PurchaseDTO) {
    if (this.formPristine()) {
      this.navigateBackToPurchasesScreen();
      return;
    }
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure you want to update existing purchase?',
      accept: () => {
        this.updatePurchase(purchase);
        this.navigateBackToPurchasesScreen();
      }
    });
  }

  protected onCancelled() {
    if (this.formPristine()) {
      this.navigateBackToPurchasesScreen();
      return;
    }
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure you want to discard unsaved changes?',
      accept: () => this.navigateBackToPurchasesScreen()
    });
  }

  private updatePurchase(purchase: PurchaseDTO) {
    this.purchasesApi.updatePurchase(this.purchaseId(), {
      date: purchase.date,
      shopId: purchase.shop.id,
      products: purchase.products.map(product => ({
        id: product.id,
        categoryId: product.category.id,
        name: product.name,
        amount: product.amount,
        price: product.price,
        description: product.description ?? ''
      }))
    }).subscribe(() => {
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Purchase updated successfully.'});
    })
  }

  private navigateBackToPurchasesScreen(): Observable<boolean> {
    return fromPromise(this.router.navigate(['expenses', 'purchases']));
  }
}
