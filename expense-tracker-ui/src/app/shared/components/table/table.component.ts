import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ColDef, GridApi, GridOptions, GridReadyEvent, ITextFilterParams } from 'ag-grid-community';
import { TableDatePickerComponent } from '@shared/components/table-date-picker/table-date-picker.component';
import { AutoCompleteCellEditor } from '@shared/components/auto-complete-cell-editor/auto-complete-cell-editor.component';
import { form, numerator } from '@shared/components/table/grid-definitions/column-types';
import { currency } from '@shared/components/table/grid-definitions/data-types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  public readonly components = {
    agDateInput: TableDatePickerComponent,
    agAutoCompleteInput: AutoCompleteCellEditor
  };

  public readonly defaultColDef: ColDef = {
    flex: 1,
    menuTabs: ['filterMenuTab'],
    sortable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      maxNumConditions: 1,
      buttons: ['apply', 'reset'],
      closeOnApply: true
    } as ITextFilterParams,
    suppressMovable: true
  };

  public readonly defaultGridOptions: GridOptions = {
    components: this.components,
    defaultColDef: this.defaultColDef,
    pagination: true,
    cacheBlockSize: 50,
    paginationPageSize: 12,
    paginationPageSizeSelector: [12, 20, 50, 100],
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    suppressCellFocus: true,
    suppressMenuHide: true,
    suppressContextMenu: true,
    rowModelType: 'serverSide',
    columnTypes: {
      numerator,
      form
    },
    dataTypeDefinitions: {
      currency
    },
    onGridReady: (event: GridReadyEvent) => {
      this.api = event.api;
      this.onGridReady.next(event);
    }
  };

  @Input()
  public header: string;

  @Input()
  public gridOptions: GridOptions;

  @Output()
  public onGridReady = new EventEmitter<GridReadyEvent>;

  public api: GridApi;

  public composeGridOptions(): GridOptions {
    return {
      ...this.defaultGridOptions,
      ...this.gridOptions,
      defaultColDef: {...this.defaultColDef, ...this.gridOptions.defaultColDef}
    };
  }
}

