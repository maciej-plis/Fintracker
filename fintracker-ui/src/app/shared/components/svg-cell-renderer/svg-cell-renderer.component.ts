import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-svg-cell-renderer',
  templateUrl: './svg-cell-renderer.component.html',
  styleUrl: './svg-cell-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SvgIconComponent
  ]
})
export class SvgCellRenderer implements ICellRendererAngularComp {

  protected readonly svgSrc = signal<string | null>(null);

  public agInit(params: SvgCellRendererParams): void {
    this.updateState(params);
  }

  public refresh(params: SvgCellRendererParams): boolean {
    this.updateState(params);
    return true;
  }

  private updateState(params: SvgCellRendererParams): void {
    this.svgSrc.set(params.src);
  }
}

export interface SvgCellRendererParams extends ICellRendererParams {
  src: string;
}

