import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { ColDef, GridApi, GridOptions, GridReadyEvent, ITextFilterParams } from 'ag-grid-community';
import { TableDatePickerComponent } from '@shared/components/table-date-picker/table-date-picker.component';
import { AutoCompleteCellEditor } from '@shared/components/auto-complete-cell-editor/auto-complete-cell-editor.component';
import { button, form, numerator } from '@shared/components/table/grid-definitions/column-types';
import { currency } from '@shared/components/table/grid-definitions/data-types';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Tag } from 'primeng/tag';
import { TablePersistenceService } from '@shared/services/table-persistence/table-persistence.service';

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
    ReactiveFormsModule,
    Tag
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
    suppressHeaderFocus: true,
    suppressCellFocus: true,
    suppressContextMenu: true,
    columnTypes: { numerator, form, button },
    dataTypeDefinitions: { currency }
  };

  private static readonly SERVER_SIDE_GRIP_OPTIONS: GridOptions = {
    rowModelType: 'serverSide',
    pagination: true,
    cacheBlockSize: 100,
    paginationPageSize: 25,
    paginationPageSizeSelector: [ 10, 25, 50, 100 ]
  };

  private static readonly CLIENT_SIDE_GRIP_OPTIONS: GridOptions = {};

  private readonly persistenceService = inject(TablePersistenceService);

  public readonly header = input.required<string>();
  public readonly gridOptions = input.required<GridOptions>();
  public readonly persistence = input<string>();
  public readonly mode = input<'client' | 'server'>('client');

  public readonly isReady = signal(false);
  public api?: GridApi;

  public readonly sortCount = signal(0);
  public readonly sortLabelForm = computed(() => this.sortCount() == 1 ? 'sort' : 'sorts');

  public readonly filterCount = signal(0);
  public readonly filterLabelForm = computed(() => this.filterCount() == 1 ? 'filter' : 'filters');

  protected composedGridOptions = computed(() => {
    const gridOptions = this.gridOptions();
    return {
      ...TableComponent.DEFAULT_GRID_OPTIONS,
      ...(this.mode() === 'client' ? TableComponent.CLIENT_SIDE_GRIP_OPTIONS : TableComponent.SERVER_SIDE_GRIP_OPTIONS),
      ...gridOptions,
      defaultColDef: { ...TableComponent.DEFAULT_COL_DEF, ...gridOptions.defaultColDef },
      onGridReady: (event: GridReadyEvent) => {
        this.api = event.api;
        this.setupPersistence(event.api);
        this.setupFilterAndSortObservers(event.api);
        this.isReady.set(true);
        gridOptions.onGridReady?.(event);
      }
    };
  });

  protected clearTableSorts(): void {
    const state = this.api?.getColumnState().map(c => ({ ...c, sort: null }));
    this.api?.applyColumnState({ state });
  }

  protected clearTableFilters(): void {
    this.api?.setFilterModel(null);
  }

  private setupPersistence(api: GridApi) {
    const persistenceKey = this.persistence();
    if (!persistenceKey) return;

    this.persistenceService.restoreTableState(persistenceKey, api);
    this.persistenceService.watchAndPersistTableState(persistenceKey, api);
  }

  private setupFilterAndSortObservers(api: GridApi) {
    this.updateFilterCount(api);
    api.addEventListener('filterChanged', () => this.updateFilterCount(api));
    this.updateSortCount(api);
    api.addEventListener('sortChanged', () => this.updateSortCount(api));
  }

  private updateFilterCount(api: GridApi): void {
    this.filterCount.set(Object.keys(api.getFilterModel() ?? {}).length);
  }

  private updateSortCount(api: GridApi): void {
    this.sortCount.set(api.getColumnState().filter(c => c.sort).length);
  }
}

