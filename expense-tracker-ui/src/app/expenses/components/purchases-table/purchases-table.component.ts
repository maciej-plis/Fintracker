import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { PurchaseSummariesApi, PurchaseSummaryDTO, ShopsApi } from '@core/api';
import { ColDef, GridOptions, ICellRendererParams, IRowNode, ISetFilterParams } from 'ag-grid-community';
import { currencyValueFormatter, dateValueFormatter } from '@shared/utils/table-formatters.utils';
import { currencyCode, currencyFormat, locale } from '../../../app.constants';
import { ButtonCellRendererComponent, ButtonCellRendererParams } from '@shared/components/button-cell-renderer/button-cell-renderer.component';
import { ServerSideDatasource } from '@shared/components/table/model/ServerSideDatasource';
import { nonNullableDateFilterOptions, nonNullableNumberFilterOptions } from '@shared/constants/table-filters.constants';
import { TableComponent } from '@shared/components/table/table.component';

@Component({
  selector: 'app-purchases-table',
  templateUrl: './purchases-table.component.html',
  styleUrls: ['./purchases-table.component.scss']
})
export class PurchasesTableComponent {

  @ViewChild('table') table: TableComponent;

  @Output()
  public readonly rowEdit = new EventEmitter<any>();

  @Output()
  public readonly deleteSelected = new EventEmitter<IRowNode[]>();

  @Output()
  public readonly addNewItem = new EventEmitter<void>();

  private readonly purchaseSummariesApi = inject(PurchaseSummariesApi);
  private readonly shopsApi = inject(ShopsApi);

  private readonly columnDefs: ColDef[] = [
    {
      checkboxSelection: true,
      maxWidth: 50,
      sortable: false,
      suppressMenu: true
    },
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
      filterParams: {filterOptions: nonNullableNumberFilterOptions},
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      filter: 'agNumberColumnFilter',
      filterParams: {filterOptions: nonNullableNumberFilterOptions},
      valueFormatter: currencyValueFormatter(currencyFormat, currencyCode, 'narrow', locale)
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      suppressMenu: true,
      sort: 'desc',
      valueFormatter: dateValueFormatter('medium', locale)
    },
    {
      headerName: '',
      maxWidth: 80,
      cellRenderer: ButtonCellRendererComponent,
      cellRendererParams: {
        icon: 'pi pi-pencil',
        title: 'Edit',
        clicked: (params: ICellRendererParams) => this.rowEdit.emit(params.data)
      } as ButtonCellRendererParams,
      suppressMenu: true,
      sortable: false
    }
  ];

  public readonly gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    getRowId: params => params.data.id,
    serverSideDatasource: new ServerSideDatasource<PurchaseSummaryDTO>(this.purchaseSummariesApi.getPurchaseSummaries.bind(this.purchaseSummariesApi))
  };

  public onDeleteSelected() {
    const selection = this.table.api.getSelectedNodes();
    this.deleteSelected.emit(selection);
  }
}
