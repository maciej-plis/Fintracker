import { Component, inject, output, viewChild } from '@angular/core';
import { PurchaseSummariesApi, PurchaseSummaryDTO, ShopsApi } from '@core/api';
import { ColDef, GridOptions, ICellRendererParams, IRowNode, ISetFilterParams } from 'ag-grid-community';
import { dateValueFormatter } from '@shared/utils/table-formatters.utils';
import { locale } from '../../../app.constants';
import { ButtonCellRendererComponent, ButtonCellRendererParams } from '@shared/components/button-cell-renderer/button-cell-renderer.component';
import { ServerSideDatasource } from '@shared/components/table/model/ServerSideDatasource';
import { nonNullableDateFilterOptions, nonNullableNumberFilterOptions } from '@shared/constants/table-filters.constants';
import { TableComponent } from '@shared/components/table/table.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-purchases-table',
  templateUrl: './purchases-table.component.html',
  styleUrls: [ './purchases-table.component.scss' ],
  imports: [
    TableComponent,
    ButtonModule
  ]
})
export class PurchasesTableComponent {

  private readonly purchaseSummariesApi = inject(PurchaseSummariesApi);
  private readonly shopsApi = inject(ShopsApi);

  public readonly table = viewChild.required(TableComponent);

  public readonly rowEdit = output<any>();
  public readonly deleteSelected = output<IRowNode[]>();
  public readonly addNewItem = output<void>();

  private readonly columnDefs: ColDef[] = [
    {
      field: 'shopName',
      headerName: 'Shop Name',
      filter: 'agSetColumnFilter',
      filterParams: {
        values: params => this.shopsApi.getShops().subscribe(shops => {
          params.success(shops.map(shop => shop.name));
        })
      } as ISetFilterParams
    },
    {
      field: 'date',
      headerName: 'Date',
      filter: 'agDateColumnFilter',
      filterParams: {filterOptions: nonNullableDateFilterOptions},
      valueFormatter: dateValueFormatter('shortDate', locale)
    },
    {
      field: 'productsCount',
      headerName: 'Products Count',
      filter: 'agNumberColumnFilter',
      filterParams: {filterOptions: nonNullableNumberFilterOptions}
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      filter: 'agNumberColumnFilter',
      filterParams: {filterOptions: nonNullableNumberFilterOptions},
      cellDataType: 'currency'
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      sort: 'desc',
      valueFormatter: dateValueFormatter('medium', locale)
    },
    {
      width: 50,
      cellRenderer: ButtonCellRendererComponent,
      cellRendererParams: {
        icon: 'pi pi-pencil',
        title: 'Edit',
        clicked: (params: ICellRendererParams) => this.rowEdit.emit(params.data)
      } as ButtonCellRendererParams,
      cellStyle: { lineHeight: 'normal', padding: '0' },
      suppressNavigable: true,
      pinned: 'right',
      sortable: false,
      filter: false
    }
  ];

  public readonly gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    getRowId: params => params.data.id,
    serverSideDatasource: new ServerSideDatasource<PurchaseSummaryDTO>(this.purchaseSummariesApi.getPurchaseSummaries.bind(this.purchaseSummariesApi)),
    rowSelection: {
      mode: 'multiRow',
      headerCheckbox: false
    }
  };

  public onDeleteSelected() {
    const selection = this.table().api?.getSelectedNodes() ?? [];
    this.deleteSelected.emit(selection);
  }
}
