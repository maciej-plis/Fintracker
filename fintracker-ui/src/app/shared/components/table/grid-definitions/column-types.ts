import { FormControl, FormGroup } from '@angular/forms';
import { ValidationCellRenderer, ValidationCellRendererParams } from '@shared/components/validation-cell-renderer/validation-cell-renderer.component';
import {
  CellClassParams,
  CellRendererSelectorResult,
  ColTypeDef,
  ICellEditorParams,
  ICellRendererParams,
  ValueGetterParams,
  ValueSetterParams
} from 'ag-grid-community';
import { SvgCellRenderer, SvgCellRendererParams } from '@shared/components/svg-cell-renderer/svg-cell-renderer.component';
import { Subtract } from '@shared/utils';

export const numerator: ColTypeDef = {
  resizable: false,
  sortable: false,
  suppressNavigable: true,
  suppressFillHandle: true,
  valueGetter: numeratorValueGetter.bind(this),
  cellRendererSelector: numeratorCellRenderer.bind(this)
};

export const form: ColTypeDef = {
  editable: true,
  valueGetter: formValueGetter.bind(this),
  valueSetter: formValueSetter.bind(this),
  cellRenderer: ValidationCellRenderer,
  cellRendererParams: {
    defaultErrorMessage: 'This value is invalid',
    errorMessages: {
      required: 'This field is required'
    }
  } as Subtract<ValidationCellRendererParams, ICellRendererParams>,
  cellClassRules: {
    'ag-cell-invalid': agCellInvalidRule.bind(this)
  }
};

const pinnedRowIconRenderer: CellRendererSelectorResult = {
  component: SvgCellRenderer,
  params: {src: '/assets/svg/pin.svg'} as SvgCellRendererParams
};

function numeratorValueGetter(params: ValueGetterParams): number | null {
  const rowIndex = params.node?.rowIndex;
  return rowIndex != null ? rowIndex + 1 : null;
}

function numeratorCellRenderer(params: ICellRendererParams): CellRendererSelectorResult | undefined {
  return params.node.isRowPinned() ? pinnedRowIconRenderer : undefined;
}

function formValueGetter(params: ValueGetterParams): any | null {
  if (!hasFormGroupDataWithField(params)) return null;
  return params.data.get(params.colDef.field)?.value;
}

function formValueSetter(params: ValueSetterParams): boolean {
  if (!hasFormGroupDataWithField(params)) return false;
  params.data.get(params.colDef.field)?.setValue(params.newValue);
  return params.newValue !== params.oldValue;
}

function agCellInvalidRule(params: CellClassParams): boolean {
  const formControl = getFormControl(params);
  return !formControl ? false : !formControl.valid && formControl.touched;
}

// TODO Move elsewhere
export type GridParams<TData = any, TValue = any> =
  ICellRendererParams<TData, TValue>
  | ICellEditorParams<TData, TValue>
  | ValueGetterParams<TData, TValue>
  | ValueSetterParams<TData, TValue>
  | CellClassParams<TData, TValue>;

// TODO Move elsewhere
export function hasFormGroupDataWithField<T extends GridParams>(params: T): params is T & { colDef: { field: string }, data: FormGroup } {
  return (params.data instanceof FormGroup) && !!params.colDef?.field;
}

export function getFormControl<T extends GridParams>(params: T): FormControl | null {
  if (!(params.data instanceof FormGroup) || !params.colDef?.field) return null;
  const formControl = params.data.get(params.colDef.field) ?? null;
  return formControl instanceof FormControl ? formControl : null;
}
