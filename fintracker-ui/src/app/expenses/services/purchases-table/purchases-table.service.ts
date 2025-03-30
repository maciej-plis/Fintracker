import { inject, Injectable } from '@angular/core';
import { GridApi, GridOptions, ICellRendererParams } from 'ag-grid-community';
import { columnDefs } from '@expenses/components/purchases-table/purchases-table.columns';
import { ServerSideDatasource } from '@shared/components/table/model/ServerSideDatasource';
import { PurchasesApi, PurchaseSummariesApi, PurchaseSummaryDTO, ShopsApi } from '@core/api';
import { SetFilterValuesFuncParams } from 'ag-grid-enterprise';
import type { AgGridCommon } from 'ag-grid-community/dist/types/src/interfaces/iCommon';
import { hasValue } from '@shared/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

export type PurchasesTableCellRendererParams<T = any> = ICellRendererParams<PurchaseSummaryDTO, T, PurchasesTableContext>
export type PurchasesTableSetFilterValuesFuncParams = Omit<SetFilterValuesFuncParams<PurchaseSummaryDTO>, 'context'> & AgGridCommon<PurchaseSummaryDTO, PurchasesTableContext>

@Injectable()
export class PurchasesTableService {

  private readonly purchaseSummariesApi = inject(PurchaseSummariesApi);
  private readonly shopsApi = inject(ShopsApi);
  private readonly purchasesApi = inject(PurchasesApi);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  public api!: GridApi<PurchaseSummaryDTO>;

  public gridOptions: GridOptions<PurchaseSummaryDTO> = {
    columnDefs: columnDefs,
    getRowId: params => params.data.id,
    serverSideDatasource: new ServerSideDatasource<PurchaseSummaryDTO>(this.purchaseSummariesApi.getPurchaseSummaries.bind(this.purchaseSummariesApi)),
    rowSelection: {
      mode: 'multiRow',
      headerCheckbox: false
    },
    context: {
      tableService: this,
      purchaseSummariesApi: this.purchaseSummariesApi,
      shopsApi: this.shopsApi
    } as PurchasesTableContext,
    onGridReady: event => this.api = event.api
  };

  public onDeleteSelected(): void {
    const selectedPurchases = this.getSelectedPurchases();
    selectedPurchases.length && this.confirmationService.confirm({
      header: 'Confirmation',
      message: `Are you sure you want to delete ${ selectedPurchases.length } purchases?`,
      accept: () => this.removePurchases(selectedPurchases)
    });
  }

  public onAddItem(): void {
    this.router.navigate([ 'expenses', 'purchases', `add` ]);
  }

  public onEditItem(purchase: PurchaseSummaryDTO): void {
    this.router.navigate([ 'expenses', 'purchases', `edit`, purchase.id ]);
  }

  private removePurchases(purchases: PurchaseSummaryDTO[]): void {
    const request = { ids: purchases.map(purchase => purchase.id) };
    this.purchasesApi.removePurchases(request).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Purchases removed successfully.' });
        this.api.applyServerSideTransaction({ remove: purchases });
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Failed to remove purchases', sticky: true })
    });
  }

  private getSelectedPurchases(): PurchaseSummaryDTO[] {
    return this.api.getSelectedNodes()
      .map(row => row.data)
      .filter(hasValue);
  }
}

export interface PurchasesTableContext {
  tableService: PurchasesTableService,
  purchaseSummariesApi: PurchaseSummariesApi,
  shopsApi: ShopsApi
}

