import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgAssetComponent } from '@shared/components/svg-asset/svg-asset.component';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  standalone: true,
  selector: 'app-svg-cell-renderer',
  templateUrl: './svg-cell-renderer.component.html',
  styleUrl: './svg-cell-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgAssetComponent]
})
export class SvgCellRenderer implements ICellRendererAngularComp {

  public params: SvgCellRendererParams;

  public agInit(params: SvgCellRendererParams): void {
    this.params = params;
  }

  public refresh(params: SvgCellRendererParams): boolean {
    return false;
  }
}

export interface SvgCellRendererParams extends ICellRendererParams {
  src: string,
}

