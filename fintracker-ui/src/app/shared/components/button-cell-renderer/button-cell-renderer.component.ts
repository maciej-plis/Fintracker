import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button-cell-renderer',
  templateUrl: './button-cell-renderer.component.html',
  styleUrls: [ './button-cell-renderer.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule
  ]
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp {

  private static readonly EMPTY_CALLBACK: OnRendererClickCallback = (_: ICellRendererParams) => void 0;

  protected readonly icon = signal<string | null>(null);
  protected readonly label = signal<string | null>(null);
  protected readonly title = signal<string | null>(null);
  protected readonly clicked = signal<OnRendererClickCallback>(ButtonCellRendererComponent.EMPTY_CALLBACK);

  protected params!: ButtonCellRendererParams;

  public agInit(params: ButtonCellRendererParams): void {
    this.updateState(params);
  }

  public refresh(params: ButtonCellRendererParams): boolean {
    this.updateState(params);
    return true;
  }

  private updateState(params: ButtonCellRendererParams): void {
    this.params = params;
    this.icon.set(params.icon ?? null);
    this.label.set(params.label ?? null);
    this.title.set(params.title ?? null);
    this.clicked.set(params.clicked ?? ButtonCellRendererComponent.EMPTY_CALLBACK);
  }
}

export type OnRendererClickCallback = (params: ICellRendererParams) => void;

export interface ButtonCellRendererParams extends ICellRendererParams {
  icon?: string;
  label?: string;
  title?: string;
  clicked: OnRendererClickCallback;
}
