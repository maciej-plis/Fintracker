import { Component, signal } from '@angular/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';
import { INoRowsOverlayParams } from 'ag-grid-enterprise';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-no-rows-table-overlay',
  templateUrl: './no-rows-table-overlay.component.html',
  styleUrl: './no-rows-table-overlay.component.scss',
  imports: [
    Message
  ]
})
export class NoRowsTableOverlayComponent implements INoRowsOverlayAngularComp {

  protected readonly isError = signal(false);

  agInit(params: NoRowsTableOverlayParams): void {
    this.isError.set(params.error ?? false);
  }
}

export interface NoRowsTableOverlayParams extends INoRowsOverlayParams {
  error?: boolean;
}
