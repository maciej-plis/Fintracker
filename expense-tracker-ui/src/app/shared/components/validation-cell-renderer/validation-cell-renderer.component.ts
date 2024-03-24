import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { TooltipModule } from 'primeng/tooltip';
import { NgIf } from '@angular/common';
import { FormControl } from '@angular/forms';
import { hasFormGroupDataWithField } from '@shared/components/table/grid-definitions/column-types';

const ERROR_MESSAGES: { [error: string]: string } = {
  required: 'This field is required'
};

@Component({
  standalone: true,
  selector: 'app-validation-cell-renderer',
  templateUrl: './validation-cell-renderer.component.html',
  styleUrl: './validation-cell-renderer.component.scss',
  imports: [
    TooltipModule,
    NgIf
  ]
})
export class ValidationCellRenderer implements ICellRendererAngularComp {

  private static readonly ERROR_SEPARATOR = '<hr/>';

  protected params: ICellRendererParams;
  protected isValid: boolean = true;
  protected message: string = '';

  public agInit(params: ICellRendererParams): void {
    this.params = params;
    this.initializeValidationStatus();
  }

  public refresh(params: ICellRendererParams): boolean {
    return false;
  }

  private initializeValidationStatus() {
    if (!hasFormGroupDataWithField(this.params)) return;
    const formControl = this.params.data.get(this.params.colDef!.field) as FormControl;
    this.isValid = formControl.valid || !formControl.touched;
    this.message = Object.keys(formControl.errors ?? {})
      .map(error => ERROR_MESSAGES[error] ?? 'This value is invalid')
      .join(ValidationCellRenderer.ERROR_SEPARATOR);
  }
}
