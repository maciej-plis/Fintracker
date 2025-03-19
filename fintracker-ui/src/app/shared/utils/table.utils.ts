import { CellClassParams, ICellEditorParams, ICellRendererParams, ValueGetterParams, ValueSetterParams } from 'ag-grid-community';
import { FormControl, FormGroup } from '@angular/forms';

export type GridParams<TData = any, TValue = any> =
  ICellRendererParams<TData, TValue>
  | ICellEditorParams<TData, TValue>
  | ValueGetterParams<TData, TValue>
  | ValueSetterParams<TData, TValue>
  | CellClassParams<TData, TValue>;

export function getFormControl<T extends GridParams>(params: T): FormControl | null {
  if (!(params.data instanceof FormGroup) || !params.colDef?.field) return null;
  const formControl = params.data.get(params.colDef.field) ?? null;
  return formControl instanceof FormControl ? formControl : null;
}
