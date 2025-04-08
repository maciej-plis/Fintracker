import { ColDef, ISetFilterParams } from 'ag-grid-community';
import { dateValueFormatter } from '@shared/utils/table-formatters.utils';
import { locale } from 'src/app/app.constants';
import { ButtonCellRendererParams } from '@shared/components/button-cell-renderer/button-cell-renderer.component';
import { nonNullableDateFilterOptions, nonNullableNumberFilterOptions } from '@shared/constants/table-filters.constants';
import { PurchaseSummaryDTO } from '@core/api';
import { PurchasesTableCellRendererParams, PurchasesTableSetFilterValuesFuncParams } from '@expenses/services/purchases-table/purchases-table.service';

export enum PurchasesTableColumns {
  SHOP_NAME = 'shopName',
  DATE = 'date',
  PRODUCTS_COUNT = 'productsCount',
  TOTAL_PRICE = 'totalPrice',
  CREATED_AT = 'createdAt',
  CONTROLS = 'controls'
}

export const columnDefs: ColDef<PurchaseSummaryDTO>[] = [
  {
    colId: PurchasesTableColumns.SHOP_NAME,
    field: 'shopName',
    headerName: 'Shop Name',
    filter: 'agSetColumnFilter',
    filterParams: {
      values: (params: PurchasesTableSetFilterValuesFuncParams) => {
        params.context.shopsApi.getShops().subscribe(shops => params.success(shops.map(shop => shop.name)));
      }
    } as ISetFilterParams
  },
  {
    colId: PurchasesTableColumns.DATE,
    field: 'date',
    headerName: 'Date',
    filter: 'agDateColumnFilter',
    filterParams: { filterOptions: nonNullableDateFilterOptions },
    valueFormatter: dateValueFormatter('shortDate', locale)
  },
  {
    colId: PurchasesTableColumns.PRODUCTS_COUNT,
    field: 'productsCount',
    headerName: 'Products Count',
    filter: 'agNumberColumnFilter',
    filterParams: { filterOptions: nonNullableNumberFilterOptions }
  },
  {
    colId: PurchasesTableColumns.TOTAL_PRICE,
    field: 'totalPrice',
    headerName: 'Total Price',
    filter: 'agNumberColumnFilter',
    filterParams: { filterOptions: nonNullableNumberFilterOptions },
    cellDataType: 'currency'
  },
  {
    colId: PurchasesTableColumns.CREATED_AT,
    field: 'createdAt',
    headerName: 'Created At',
    filter: 'agDateColumnFilter',
    filterParams: { filterOptions: nonNullableDateFilterOptions },
    valueFormatter: dateValueFormatter('medium', locale),
    sort: 'desc'
  },
  {
    colId: PurchasesTableColumns.CONTROLS,
    pinned: 'right',
    type: 'button',
    cellRendererParams: {
      icon: 'pi pi-pencil',
      title: 'Edit',
      clicked: ({ context, data }: PurchasesTableCellRendererParams) => data && context.tableService.onEditItem(data)
    } as ButtonCellRendererParams
  }
];
