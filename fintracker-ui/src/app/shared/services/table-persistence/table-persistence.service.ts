import { Injectable } from '@angular/core';
import { FilterModel } from 'ag-grid-enterprise';
import { GridApi } from 'ag-grid-community';

@Injectable({
  providedIn: 'root'
})
export class TablePersistenceService {

  private readonly tableStates = new Map<string, PersistableTableState>();

  public restoreTableState(key: string, api: GridApi): void {
    const state = this.tableStates.get(key);
    if (!state) return;

    api.setGridOption('paginationPageSize', state.paginationModel.pageSize);
    api.addEventListener('firstDataRendered', () => {
      api.paginationGoToPage(state.paginationModel.page);
      api.ensureColumnVisible(state.visibilityModel.colId, 'start');
      api.ensureIndexVisible(state.visibilityModel.rowIndex, 'top');
    });

    api.applyColumnState({ state: api.getColumnState().map(c => ({ ...c, sort: state.sortModel[c.colId] })) });

    api.setFilterModel(state.filterModel);
  }

  public watchAndPersistTableState(key: string, api: GridApi): void {
    this.updateVisibilityModelColumn(key, api);
    api.addEventListener('displayedColumnsChanged', () => this.updateVisibilityModelColumn(key, api));

    this.updateVisibilityModelRow(key, api);
    api.addEventListener('bodyScrollEnd', () => this.updateVisibilityModelRow(key, api));

    this.updateSortModel(key, api);
    api.addEventListener('sortChanged', () => this.updateSortModel(key, api));

    this.updateFilterModel(key, api);
    api.addEventListener('filterChanged', () => this.updateFilterModel(key, api));

    this.updatePaginationModel(key, api);
    api.addEventListener('paginationChanged', () => this.updatePaginationModel(key, api));
  }

  private updateVisibilityModelColumn(key: string, api: GridApi): void {
    const state = this.tableStates.get(key) ?? this.emptyModel();
    const columns = api.getDisplayedCenterColumns();
    const scrollFromLeft = api.getHorizontalPixelRange().left;
    const colIndex = columns.findIndex(c => (c.getLeft() ?? 0) > scrollFromLeft);
    const colId = columns[Math.max(colIndex - 1, 0)]?.getColId() ?? '';
    this.tableStates.set(key, { ...state, visibilityModel: { ...state.visibilityModel, colId } });
  }

  private updateVisibilityModelRow(key: string, api: GridApi): void {
    const state = this.tableStates.get(key) ?? this.emptyModel();
    const rows = api.getRenderedNodes();
    const scrollFromTop = api.getVerticalPixelRange().top;
    const rowIndex = rows.find(r => (r.rowTop || 0) > scrollFromTop)?.rowIndex ?? 0;
    this.tableStates.set(key, { ...state, visibilityModel: { ...state.visibilityModel, rowIndex: Math.max(rowIndex - 1, 0) } });
  }

  private updatePaginationModel(key: string, api: GridApi): void {
    const state = this.tableStates.get(key) ?? this.emptyModel();
    const pageSize = api.paginationGetPageSize();
    const page = api.paginationGetCurrentPage();
    this.tableStates.set(key, { ...state, paginationModel: { page, pageSize } });
  }

  private updateSortModel(key: string, api: GridApi): void {
    const state = this.tableStates.get(key) ?? this.emptyModel();
    const sortModel = api.getColumnState().reduce((prev, c) => ({ ...prev, [c.colId]: c.sort }), {});
    this.tableStates.set(key, { ...state, sortModel });
  }

  private updateFilterModel(key: string, api: GridApi): void {
    const state = this.tableStates.get(key) ?? this.emptyModel();
    const filterModel = api.getFilterModel();
    this.tableStates.set(key, { ...state, filterModel });
  }

  private emptyModel(): PersistableTableState {
    return { visibilityModel: { colId: '', rowIndex: 0 }, sortModel: {}, filterModel: {}, paginationModel: { page: 0, pageSize: undefined } };
  }
}

export interface PersistableTableState {
  visibilityModel: VisibilityModel;
  sortModel: SortModel;
  filterModel: FilterModel;
  paginationModel: PaginationModel;
}

export interface VisibilityModel {
  colId: string;
  rowIndex: number;
}

export interface SortModel {
  [colId: string]: 'asc' | 'desc' | null | undefined;
}

export interface PaginationModel {
  page: number;
  pageSize: number | undefined;
}
