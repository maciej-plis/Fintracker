import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

@Component({
  standalone: true,
  selector: 'app-action-cell-editor',
  templateUrl: './action-cell-editor.component.html',
  styleUrls: ['./action-cell-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class ActionCellEditor implements ICellEditorAngularComp {

  public agInit(params: ActionCellEditorParams): void {
    params.api.stopEditing();
    if (params.eventKey === 'Enter') {
      window.setTimeout(() => params.action(params));
    }
  }

  public getValue(): void {
  }
}

export interface ActionCellEditorParams extends ICellEditorParams {
  action: (params: ICellEditorParams) => void;
}
