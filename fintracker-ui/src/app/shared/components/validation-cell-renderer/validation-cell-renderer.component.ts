import { Component, signal } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { TooltipModule } from 'primeng/tooltip';
import { getFormControl, isNonNull } from '@shared/utils';

@Component({
  selector: 'app-validation-cell-renderer',
  templateUrl: './validation-cell-renderer.component.html',
  styleUrl: './validation-cell-renderer.component.scss',
  imports: [ TooltipModule ]
})
export class ValidationCellRenderer implements ICellRendererAngularComp {

  protected readonly value = signal<string>('');
  protected readonly isError = signal<boolean>(true);
  protected readonly error = signal<string>('');

  public agInit(params: ValidationCellRendererParams): void {
    this.updateState(params);
  }

  public refresh(params: ValidationCellRendererParams): boolean {
    this.updateState(params);
    return true;
  }

  private updateState(params: ValidationCellRendererParams): void {
    const formControl = getFormControl(params);
    if (!formControl) return;

    this.value.set(params.valueFormatted || params.value);
    this.isError.set(!formControl.valid && formControl.touched);
    this.error.set(Object.keys(formControl.errors ?? {})
      .map(errorKey => params.errorMessages[errorKey] ?? null)
      .find(isNonNull) ?? params.defaultErrorMessage);
  }
}

export interface ValidationCellRendererParams extends ICellRendererParams {
  errorMessages: { [error: string]: string };
  defaultErrorMessage: string;
}

