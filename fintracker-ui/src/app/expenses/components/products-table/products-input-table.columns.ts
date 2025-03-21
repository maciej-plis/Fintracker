import { CellEditorSelectorResult, CellRendererSelectorResult, ColDef, Column, GridApi, ICellEditorParams, ICellRendererParams, IRowNode, RowPinnedType } from 'ag-grid-community';
import { AutoCompleteCellEditor, AutoCompleteCellEditorParams } from '@shared/components/auto-complete-cell-editor/auto-complete-cell-editor.component';
import { ProductForm, ProductsInputTableContext } from './products-input-table.component';
import { CategoryDTO, ProductDTO } from '@core/api';
import { startsWithIgnoreCase } from '@shared/utils/string.utils';
import { ActionCellEditor, ActionCellEditorParams } from '@shared/components/action-cell-editor/action-cell-editor.component';
import { ButtonCellRendererComponent, ButtonCellRendererParams } from '@shared/components/button-cell-renderer/button-cell-renderer.component';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { v4 as randomUUID } from 'uuid';
import { MenuCellRenderer, MenuCellRendererParams } from '@shared/components/menu-cell-renderer/menu-cell-renderer.component';
import { AddCategoryDialog } from 'src/app/expenses/dialogs';
import { AddCategoryDialogData } from 'src/app/expenses/dialogs/add-category/add-category.dialog';
import { Observable, of } from 'rxjs';

const ADD_CATEGORY_ITEM_OPTION: CategoryDTO = {id: '', name: '(Add Item)'};

export enum Columns {
  NUMERATOR = 'numerator',
  CATEGORY = 'category',
  NAME = 'name',
  AMOUNT = 'amount',
  PRICE = 'price',
  DESCRIPTION = 'description',
  CONTROLS = 'controls'
}

export const columnDefs: ColDef[] = [
  {
    colId: Columns.NUMERATOR,
    type: 'numerator',
    headerName: 'No.'
  },
  {
    colId: Columns.CATEGORY,
    type: 'form',
    field: 'category',
    headerName: 'Category',
    cellDataType: 'object',
    valueFormatter: params => params.value?.name,
    cellEditorSelector: categoryCellEditor.bind(this)
  },
  {
    colId: Columns.NAME,
    type: 'form',
    field: 'name',
    headerName: 'Name',
    cellEditorSelector: nameCellEditor.bind(this)
  },
  {
    colId: Columns.AMOUNT,
    type: 'form',
    field: 'amount',
    cellDataType: 'number',
    headerName: 'Amount (pcs/kg)'
  },
  {
    colId: Columns.PRICE,
    type: 'form',
    field: 'price',
    headerName: 'Price',
    cellDataType: 'currency'
  },
  {
    colId: Columns.DESCRIPTION,
    type: 'form',
    field: 'description',
    headerName: 'Description'
  },
  {
    colId: Columns.CONTROLS,
    minWidth: 50,
    maxWidth: 50,
    suppressFillHandle: true,
    resizable: false,
    pinned: 'right',
    editable: true,
    cellEditorSelector: controlsCellEditor.bind(this),
    cellRendererSelector: controlsCellRenderer.bind(this),
    cellStyle: {lineHeight: 'normal'}
  }
];

function categoryCellEditor(params: ICellEditorParams): CellEditorSelectorResult {
  const context = params.context as ProductsInputTableContext;
  return {
    component: AutoCompleteCellEditor,
    params: {
      suggestionsFunc: filter => filterCategorySuggestions(context.categoriesService.categories(), filter),
      onSelect: (event, filter, valueSetter) => {
        if (event.value !== ADD_CATEGORY_ITEM_OPTION) return;
        const cell = params.api.getFocusedCell();
        valueSetter(undefined);
        context.dialogService.open<CategoryDTO | null>(AddCategoryDialog, {
          data: {
            name: filter
          } as AddCategoryDialogData
        }).subscribe(category => {
          cell && params.api.startEditingCell({rowIndex: cell.rowIndex, colKey: cell.column.getColId(), rowPinned: cell.rowPinned});
          (params.api.getCellEditorInstances()[0] as AutoCompleteCellEditor).setValue(category);
        });
      },
      forceSelection: true,
      label: 'name'
    } as AutoCompleteCellEditorParams
  };
}

function filterCategorySuggestions(categories: CategoryDTO[], filter: string): Observable<CategoryDTO[]> {
  const filteredCategories = categories.filter(suggestion => startsWithIgnoreCase(suggestion.name, filter));
  return of([...filteredCategories, ADD_CATEGORY_ITEM_OPTION]);
}

function nameCellEditor(params: ICellEditorParams): CellEditorSelectorResult {
  const context = params.context as ProductsInputTableContext;
  return {
    component: AutoCompleteCellEditor,
    params: {
      suggestionsFunc: filter => context.productsApi.getProductNames(filter),
      minLength: 2,
      delay: 100
    } as AutoCompleteCellEditorParams
  };
}

function controlsCellEditor(params: ICellEditorParams): CellEditorSelectorResult {
  return params.node.isRowPinned() ? actionCellEditor(addRow) : actionCellEditor(toggleMenu);
}

function actionCellEditor(action: ActionCellEditorParams['action']): CellEditorSelectorResult {
  return {
    component: ActionCellEditor,
    params: {action}
  };
}

function controlsCellRenderer(params: ICellRendererParams): CellRendererSelectorResult {
  return params.node.isRowPinned() ? addRowBtnRenderer(params) : menuRenderer(params);
}

function addRowBtnRenderer(params: ICellRendererParams): CellRendererSelectorResult {
  return {
    component: ButtonCellRendererComponent,
    params: {
      icon: 'pi pi-plus',
      title: 'Save',
      clicked: addRow
    } as ButtonCellRendererParams
  };
}

function menuRenderer(params: ICellRendererParams): CellRendererSelectorResult {
  return {
    component: MenuCellRenderer,
    params: {
      menuItems: [
        {
          icon: 'pi pi-copy',
          label: 'Clone',
          command: _ => cloneRow(params)
        },
        {
          icon: 'pi pi-trash',
          label: 'Delete',
          command: _ => deleteRow(params)
        }
      ]
    } as MenuCellRendererParams
  };
}

function addRow(params: ICellEditorParams | ICellRendererParams) {
  if (!isProductForm(params.data)) return;

  params.data.markAllAsTouched();
  refreshPinnedRows(params.api);

  if (!params.data.valid) return;

  const context = params.context as ProductsInputTableContext;
  context.formArray.insert(0, params.data);
  params.api.applyTransaction({add: [params.data], addIndex: 0});
  refreshNumeratorColumn(params.api);

  params.api.setGridOption('pinnedTopRowData', [buildProductForm()]);
  focusCell(params.api, 0, 'category', 'top');
}

function deleteRow(params: ICellEditorParams | ICellRendererParams) {
  if (!isProductForm(params.data)) return;
  const context = params.context as ProductsInputTableContext;

  const id = params.data.value.id;
  const index = context.formArray.value.findIndex(productForm => productForm?.id === id);
  if (index === -1) return;

  context.formArray.removeAt(index);
  params.api.applyTransaction({remove: [params.data]});
  refreshNumeratorColumn(params.api);

  focusCellAfterDeletingRow(params.api);
}

function cloneRow(params: ICellEditorParams | ICellRendererParams) {
  if (!isProductForm(params.data)) return;

  const context = params.context as ProductsInputTableContext;
  const id = params.data.value.id;
  const productIndex = context.formArray.value.findIndex(productForm => productForm?.id === id);
  if (productIndex === -1) return;

  const product = context.formArray.value[productIndex];
  const productForm = buildProductForm(product as Partial<ProductDTO>);
  context.formArray.insert(productIndex + 1, productForm);
  params.api.applyTransaction({add: [productForm], addIndex: params.rowIndex + 1});
  refreshNumeratorColumn(params.api);
}

function toggleMenu(params: ICellEditorParams | ICellRendererParams) {
  const menuCellRenderer = params.api.getCellRendererInstances({rowNodes: [params.node], columns: [params.column!]})[0] as MenuCellRenderer;
  menuCellRenderer.triggerMenuButton();
}

function focusCellAfterDeletingRow(api: GridApi) {
  const {rowIndex, column, rowPinned} = api.getFocusedCell()!;
  const itemsLeft = api.getDisplayedRowCount();

  if (rowIndex === 0 && itemsLeft === 0) focusCell(api, 0, 'category', 'top'); // If no more rows set focus to pinned row
  else if (rowIndex === itemsLeft) focusCell(api, rowIndex - 1, column, rowPinned); // If last row removed set focus to new last
  else focusCell(api, rowIndex, column, rowPinned); // Set focus to next item
}

function refreshPinnedRows(api: GridApi) {
  api.refreshCells({force: true, rowNodes: getPinnedRowNodes(api)});
}

function refreshNumeratorColumn(api: GridApi) {
  api.refreshCells({columns: [Columns.NUMERATOR]});
  api.autoSizeColumns([Columns.NUMERATOR]);
}

function getPinnedRowNodes(api: GridApi): IRowNode[] {
  const pinnedRowNodes: IRowNode[] = [];
  for (let i = 0; i < api.getPinnedTopRowCount(); i++) {
    pinnedRowNodes.push(api.getPinnedTopRow(i)!);
  }
  return pinnedRowNodes;
}

function focusCell(api: GridApi, rowIndex: number, colKey: string | Column, rowPinned?: RowPinnedType) {
  api.clearRangeSelection();
  api.setFocusedCell(rowIndex, colKey, rowPinned);
}

function isProductForm(data: any): data is FormGroup<ProductForm> {
  return (data instanceof FormGroup); // TODO Contain Controls
}

const PRODUCT_FORM_VALIDATORS: Record<keyof ProductForm, ValidatorFn[]> = {
  id: [],
  category: [Validators.required],
  name: [Validators.required],
  amount: [Validators.required],
  price: [Validators.required],
  description: []
};

export const buildProductForm = (productDto?: Partial<ProductDTO>) => new FormGroup<ProductForm>({
  id: new FormControl(productDto?.id ?? randomUUID(), {validators: PRODUCT_FORM_VALIDATORS.id, nonNullable: true}),
  category: new FormControl(productDto?.category ?? null, PRODUCT_FORM_VALIDATORS.category),
  name: new FormControl(productDto?.name ?? null, PRODUCT_FORM_VALIDATORS.name),
  amount: new FormControl(productDto?.amount ?? null, PRODUCT_FORM_VALIDATORS.amount),
  price: new FormControl(productDto?.price ?? null, PRODUCT_FORM_VALIDATORS.price),
  description: new FormControl(productDto?.description ?? null, PRODUCT_FORM_VALIDATORS.description)
});

