import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { IRowNode } from 'ag-grid-community';
import { PurchaseDTO, PurchasesApi } from '@core/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PurchasesTableComponent } from '../../components/purchases-table/purchases-table.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.view.html',
  styleUrls: ['./purchases.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchasesView {

  private readonly purchasesApi = inject(PurchasesApi);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private purchasesTable = viewChild.required(PurchasesTableComponent);

  public onRowEdit(purchase: PurchaseDTO) {
    this.router.navigate(['expenses', 'purchases', `edit`, purchase.id]);
  }

  public onDeleteSelected(selection?: IRowNode[]) {
    if (!selection?.length) return;
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: `Are you sure you want to delete ${ selection.length } purchases?`,
      accept: () => this.removePurchases(selection)
    });
  }

  public onAddNewItem() {
    this.router.navigate(['expenses', 'purchases', 'add']);
  }

  private removePurchases(rows: IRowNode[]) {
    const request = {ids: rows.map(row => row.id!)};
    this.purchasesApi.removePurchases(request).subscribe({
      next: () => {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'Purchases removed successfully.'});
        this.purchasesTable().table().api?.applyServerSideTransaction({remove: rows.map(row => row.data)});
      },
      error: () => this.messageService.add({severity: 'error', summary: 'Failure', detail: 'Failed to remove purchases', sticky: true})
    });
  }
}
