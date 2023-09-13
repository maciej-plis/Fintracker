import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

@Component({
  selector: 'app-button-cell-editor',
  templateUrl: './action-cell-editor.component.html',
  styleUrls: ['./action-cell-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionCellEditor implements ICellEditorAngularComp {

  public agInit(params: ActionCellEditorParams): void {
    params.api.stopEditing();
    window.setTimeout(() => {
      params.action(params);
      this.refreshFocus(params);
    });
  }

  public getValue(): any {
    return null;
  }

  private refreshFocus(params: ActionCellEditorParams) {
    const focusedCell = params.api.getFocusedCell();
    if (!focusedCell) return;
    const {rowIndex, column, rowPinned} = focusedCell;
    params.api.setFocusedCell(rowIndex, column, rowPinned);
  }
}

export interface ActionCellEditorParams extends ICellEditorParams {
  action: (params: ICellEditorParams) => void;
}
