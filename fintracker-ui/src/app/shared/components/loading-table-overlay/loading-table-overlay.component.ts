import { Component } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';
import { ILoadingOverlayParams } from 'ag-grid-enterprise';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading-table-overlay',
  templateUrl: './loading-table-overlay.component.html',
  styleUrl: './loading-table-overlay.component.scss',
  imports: [
    ProgressSpinner
  ]
})
export class LoadingTableOverlayComponent implements ILoadingOverlayAngularComp {

  agInit(params: ILoadingOverlayParams): void {
  }
}
