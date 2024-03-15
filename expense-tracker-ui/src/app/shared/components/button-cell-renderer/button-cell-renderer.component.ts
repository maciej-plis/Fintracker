import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-button-cell-renderer',
  templateUrl: './button-cell-renderer.component.html',
  styleUrls: ['./button-cell-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule
  ]
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp {

  protected params: ButtonCellRendererParams;

  public agInit(params: ButtonCellRendererParams): void {
    this.params = params;
  }

  public refresh(params: ButtonCellRendererParams): boolean {
    this.params = params;
    return true;
  }
}

export interface ButtonCellRendererParams extends ICellRendererParams {
  icon?: string,
  label?: string,
  title?: string,
  clicked: (params: ICellRendererParams) => {}
}
