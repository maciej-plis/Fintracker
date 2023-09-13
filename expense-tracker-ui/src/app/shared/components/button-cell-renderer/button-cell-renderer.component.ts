import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-cell-renderer',
  templateUrl: './button-cell-renderer.component.html',
  styleUrls: ['./button-cell-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp {

  @ViewChild('button', {read: ElementRef})
  public button: ElementRef;

  public params: ButtonCellRendererParams;

  public agInit(params: ButtonCellRendererParams): void {
    this.params = params;
  }

  public refresh(params: ButtonCellRendererParams): boolean {
    return false;
  }
}

export interface ButtonCellRendererParams extends ICellRendererParams {
  icon?: string,
  label?: string,
  title?: string,
  clicked: (params: ICellRendererParams) => {}
}
