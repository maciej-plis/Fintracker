import { Component, inject, OnInit } from '@angular/core';
import { PurchasesApi, UpdatePurchaseRequest } from '@core/api';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { PurchaseFormComponent } from 'src/app/expenses/components';
import { injectParams } from 'ngxtension/inject-params';
import { Button } from 'primeng/button';
import { PurchaseFormService } from '@expenses/services/purchase-form/purchase-form.service';

@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.view.html',
  styleUrl: './edit-purchase.view.scss',
  providers: [ PurchaseFormService ],
  imports: [
    CardModule,
    TagModule,
    PurchaseFormComponent,
    Button
  ]
})
export class EditPurchaseView implements OnInit {

  protected readonly purchaseFormService = inject(PurchaseFormService);
  private readonly purchasesApi = inject(PurchasesApi);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly router = inject(Router);

  protected readonly purchaseId = injectParams(params => params['purchaseId'] ?? '');

  ngOnInit() {
    this.purchasesApi.getPurchase(this.purchaseId()).subscribe(purchase => this.purchaseFormService.reset(purchase));
    this.purchaseFormService.submitted$.subscribe(purchase => {
      if (this.purchaseFormService.form.pristine) {
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
    });
  }

  protected onCancel(): void {
    if (this.purchaseFormService.form.pristine) {
      this.navigateBackToPurchasesScreen();
      return;
    }

    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure you want to discard unsaved changes?',
      accept: () => this.navigateBackToPurchasesScreen()
    });
  }

  private updatePurchase(request: UpdatePurchaseRequest): void {
    this.purchasesApi.updatePurchase(this.purchaseId(), request).subscribe(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Success',
        detail: 'Purchase updated successfully.'
      });
    });
  }

  private navigateBackToPurchasesScreen(): Observable<boolean> {
    return fromPromise(this.router.navigate([ 'expenses', 'purchases' ]));
  }
}
