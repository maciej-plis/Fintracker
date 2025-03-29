import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ColDef, GridApi, GridOptions, GridReadyEvent, ITextFilterParams } from 'ag-grid-community';
import { TableDatePickerComponent } from '@shared/components/table-date-picker/table-date-picker.component';
import { AutoCompleteCellEditor } from '@shared/components/auto-complete-cell-editor/auto-complete-cell-editor.component';
import { form, numerator } from '@shared/components/table/grid-definitions/column-types';
import { currency } from '@shared/components/table/grid-definitions/data-types';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AgGridModule,
    AgGridModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    AutoFocusModule,
    AutoCompleteModule,
    ReactiveFormsModule
  ]
})
export class TableComponent {

  private static readonly COMPONENTS = {
    agDateInput: TableDatePickerComponent,
    agAutoCompleteInput: AutoCompleteCellEditor
  };

  private static readonly DEFAULT_COL_DEF: ColDef = {
    flex: 1,
    sortable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      maxNumConditions: 1,
      buttons: [ 'apply', 'reset' ],
      closeOnApply: true
    } as ITextFilterParams,
    suppressMovable: true,
    suppressHeaderMenuButton: true,
    resizable: false
  };

  private static readonly DEFAULT_GRID_OPTIONS: GridOptions = {
    components: TableComponent.COMPONENTS,
    defaultColDef: TableComponent.DEFAULT_COL_DEF,
    rowModelType: 'serverSide',
    pagination: true,
    cacheBlockSize: 100,
    paginationPageSize: 25,
    paginationPageSizeSelector: [ 10, 25, 50, 100 ],
    suppressHeaderFocus: true,
    suppressCellFocus: true,
    suppressContextMenu: true,
    columnTypes: { numerator, form },
    dataTypeDefinitions: { currency }
  };

  public readonly header = input.required<string>();
  public readonly gridOptions = input.required<GridOptions>();

  public readonly isReady = signal(false);
  public api?: GridApi;

  protected composedGridOptions = computed(() => {
    const gridOptions = this.gridOptions();
    return {
      ...TableComponent.DEFAULT_GRID_OPTIONS,
      ...gridOptions,
      defaultColDef: { ...TableComponent.DEFAULT_COL_DEF, ...gridOptions.defaultColDef },
      onGridReady: (event: GridReadyEvent) => {
        this.api = event.api;
        this.isReady.set(true);
        gridOptions.onGridReady?.(event);
      }
    };
  });
}

