import { Component, inject, OnInit } from '@angular/core';
import { AddPurchaseRequest, PurchasesApi } from '@core/api';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { PurchaseFormComponent } from 'src/app/expenses/components';
import { PurchaseFormService } from '@expenses/services/purchase-form/purchase-form.service';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.view.html',
  styleUrl: './add-purchase.view.scss',
  providers: [ PurchaseFormService ],
  imports: [
    CardModule,
    TagModule,
    PurchaseFormComponent,
    Button
  ]
})
export class AddPurchaseView implements OnInit {

  protected readonly purchaseFormService = inject(PurchaseFormService);
  private readonly purchasesApi = inject(PurchasesApi);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.purchaseFormService.submitted$.subscribe(purchase => {
      this.confirmationService.confirm({
        header: 'Confirmation',
        message: 'Are you sure you want to save new purchase?',
        accept: () => {
          this.savePurchase(purchase);
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

  private savePurchase(request: AddPurchaseRequest): void {
    this.purchasesApi.addPurchase(request).subscribe(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Success',
        detail: 'Purchase saved successfully.'
      });
    });
  }

  private navigateBackToPurchasesScreen(): Observable<boolean> {
    return fromPromise(this.router.navigate([ 'expenses', 'purchases' ]));
  }
}
