import { ValidationCellRenderer, ValidationCellRendererParams } from '@shared/components/validation-cell-renderer/validation-cell-renderer.component';
import { CellClassParams, CellRendererSelectorResult, ColTypeDef, ICellRendererParams, ValueGetterParams, ValueSetterParams } from 'ag-grid-community';
import { SvgCellRenderer, SvgCellRendererParams } from '@shared/components/svg-cell-renderer/svg-cell-renderer.component';
import { getFormControl, Subtract } from '@shared/utils';
import { ButtonCellRendererComponent } from '@shared/components';

export const numerator: ColTypeDef = {
  minWidth: 60,
  maxWidth: 60,
  resizable: false,
  sortable: false,
  filter: false,
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

export const button: ColTypeDef = {
  minWidth: 50,
  maxWidth: 50,
  cellRenderer: ButtonCellRendererComponent,
  cellStyle: { padding: '0' },
  resizable: false,
  sortable: false,
  filter: false
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
  const formControl = getFormControl(params);
  if (!formControl) return null;

  return formControl.value;
}

function formValueSetter(params: ValueSetterParams): boolean {
  const formControl = getFormControl(params);
  if (!formControl) return false;

  formControl.setValue(params.newValue);
  return params.newValue !== params.oldValue;
}

function agCellInvalidRule(params: CellClassParams): boolean {
  const formControl = getFormControl(params);
  return !formControl ? false : !formControl.valid && formControl.touched;
}
